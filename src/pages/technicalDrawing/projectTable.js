import { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { DataTable, Text, Card, Modal, Button, TextInput, Portal, Avatar, Switch, Divider } from 'react-native-paper';
import { colors } from '../../utilities/colors';
import { useTranslation } from 'react-i18next';
import StatusTag from './statusTag';
import ProgressBar from '../../components/chart/progressBar';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { styles } from './styles';
import * as DocumentPicker from 'expo-document-picker';
import { URL } from '../../api';
import { fetchTechnicalDrawingGetAll } from '../../redux/slices/technicalDrawingGetAllSlice';
import { useNavigation } from '@react-navigation/native';
import { fetchTechnicalDrawingNoteCreate } from '../../redux/slices/technicalDrawingNoteCreateSlice';
import { fetchTechnicalDrawingGet } from '../../redux/slices/technicalDrawingGetSlice';
import { fetchTechnicalDrawingAddFile } from '../../redux/slices/technicalDrawingAddFileSlice';
import { fetchTechnicalDrawingQualityDescription } from '../../redux/slices/technicalDrawingQualityDescriptionSlice';
import { fetchTechnicalDrawingCMMDescription } from '../../redux/slices/technicalDrawingCMMDescriptionSlice';

const ProjectTable = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [showSuccessTable, setShowSuccessTable] = useState(false);
    const [showFailureTable, setShowFailureTable] = useState(false);
    const [page1, setPage1] = useState(0);
    const [page2, setPage2] = useState(0);
    const [page3, setPage3] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [fileModalVisible, setFileModalVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(null);
    const [qualityNoteModal, setQualityNoteModal] = useState(false);
    const [qualityNoteText, setQualityNoteText] = useState('');
    const [selectedFailureId, setSelectedFailureId] = useState(null);
    const [qualityNoteLoading, setQualityNoteLoading] = useState(false);
    const [cmmNoteModal, setCmmNoteModal] = useState(false);
    const [cmmNoteText, setCmmNoteText] = useState('');
    const [selectedCmmFailureId, setSelectedCmmFailureId] = useState(null);
    const [cmmNoteLoading, setCmmNoteLoading] = useState(false);
    const technicalDrawingGetAll = useSelector(state => state.technicalDrawingGetAll.data);
    const [formData, setFormData] = useState({ note: "", description: "", status: true, partCode: "" });
    const { t } = useTranslation()
    const [isUploading, setIsUploading] = useState(false);
    const dispatch = useDispatch();
    const uploadStatus = useSelector(state => state.technicalDrawingAddFile.status);
    const navigation = useNavigation();

    const parseDate = (dateStr) => {
        if (!dateStr) return null;
        const parts = dateStr.split('.');
        if (parts.length !== 3) return null;
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
        return new Date(year, month, day);
    };

    const daysDifference = (date1, date2) => {
        if (!date1 || !date2) return 0;
        const diffTime = date2.getTime() - date1.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const calculateProgress = (project) => {
        const startDate = parseDate(project.date);
        const totalDays = Number(project.time);
        if (!startDate || isNaN(totalDays) || totalDays <= 0) {
            return { progress: 0, remainingDays: 0, totalDays: 0 };
        }
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + totalDays);

        const today = new Date();
        const remainingDays = daysDifference(today, endDate);
        const elapsedDays = daysDifference(startDate, today);
        const progress = Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100));

        return { progress, remainingDays, totalDays };
    };

    const getData = () => {
        setFilteredData(technicalDrawingGetAll);
    }

    useEffect(() => { getData() }, [])

    useEffect(() => {
        applyFilters();
    }, [searchText]);

    const applyFilters = () => {
        if (!filteredData) return;
        let result = [...filteredData];

        if (searchText) {
            const searchLower = searchText.toLowerCase();
            result = result.filter(item =>
                item.projectName.toLowerCase().includes(searchLower) ||
                item.partCode.toLowerCase().includes(searchLower) ||
                item.serialNumber.toLowerCase().includes(searchLower) ||
                item.responible?.firstName.toLowerCase().includes(searchLower) ||
                item.responible?.lastName.toLowerCase().includes(searchLower) ||
                item.personInCharge?.firstName.toLowerCase().includes(searchLower) ||
                item.personInCharge?.lastName.toLowerCase().includes(searchLower) ||
                item.description.toLowerCase().includes(searchLower)
            );
        }

        setFilteredData(result);
        setPage1(0);
    };

    const handleRowPress = (item) => {
        if (selectedProject?.id === item.id) {
            navigation.navigate('TechnicalDrawingDetail', { id: item.id });
        }
        setSelectedProject(item);
        setShowSuccessTable(item.basariliDurumlar.length > 0);
        setShowFailureTable(item.basarisizDurumlar.length > 0);
    };

    const handleSuccessRowPress = (item) => {
        navigation.navigate('TechnicalDrawingSuccessDetail', { id: item.id });
    };

    const handleFailureRowPress = (item) => {
        navigation.navigate('TechnicalDrawingFailureDetail', { id: item.id });
    };

    const handleFileUpload = async () => {
        if (!selectedRow) {
            alert("Lütfen önce bir satır seçin!");
            return;
        }
        try {
            setIsUploading(true);

            if (!fileModalVisible) {
                setIsUploading(false);
                return;
            }

            const result = await DocumentPicker.getDocumentAsync({
                type: ["image/*", "application/pdf"],
                multiple: true,
                copyToCacheDirectory: true
            });

            if (result.canceled) {
                setIsUploading(false);
                return;
            }

            const files = result.assets.map(file => {
                const now = new Date();
                return {
                    uri: file.uri,
                    name: file.name,
                    type: file.mimeType || "application/octet-stream",
                    lastModified: now.getTime(),
                    lastModifiedDate: now.toString(),
                    size: file.size || 0,
                    webkitRelativePath: ""
                };
            });

            const formData = { file: files };

            await dispatch(fetchTechnicalDrawingAddFile({ formData: formData, id: selectedRow.id }));
            await dispatch(fetchTechnicalDrawingGetAll());

            setTimeout(() => {
                const currentUploadStatus = uploadStatus;
                if (currentUploadStatus !== 'failed') {
                    alert(`${files.length} dosya başarıyla yüklendi!`);
                    getData();
                } else {
                    alert('Dosya yükleme sırasında bir hata oluştu.');
                }
                setIsUploading(false);
                setFileModalVisible(false);
            }, 500);

        } catch (error) {
            console.error("Dosya yükleme hatası:", error);
            setIsUploading(false);
            setFileModalVisible(false);
        }
    };

    const handleSaveNote = async () => {
        console.log("Form Data:", formData);
        await dispatch(fetchTechnicalDrawingNoteCreate({ formData: formData, manualId: selectedProject.id }));
        var data = await dispatch(fetchTechnicalDrawingGet({ id: selectedProject.id }));
        if (data.payload) {
            setSelectedProject(data.payload);
            setShowSuccessTable(data.payload.basariliDurumlar.length > 0);
            setShowFailureTable(data.payload.basarisizDurumlar.length > 0);
        }
        setFormData({ note: "", description: "", status: true, partCode: "" });
        getData();
        setTab(true);
        setNoteText('');
    };

    const from1 = page1 * itemsPerPage;
    const to1 = Math.min((page1 + 1) * itemsPerPage, technicalDrawingGetAll?.length);

    const from2 = selectedProject ? (page2 * itemsPerPage) : 0;
    const to2 = selectedProject ? Math.min((page2 + 1) * itemsPerPage, selectedProject.basariliDurumlar.length) : 0;

    const from3 = selectedProject ? (page3 * itemsPerPage) : 0;
    const to3 = selectedProject ? Math.min((page3 + 1) * itemsPerPage, selectedProject.basarisizDurumlar.length) : 0;

    return (
        <View style={styles.page}>
            <ScrollView>
                <View style={styles.filterContainer}>
                    <Ionicons name='search-outline' size={20} style={styles.inputIcon} />
                    <TextInput
                        mode="outlined"
                        placeholder={t("search2")}
                        value={searchText}
                        onChangeText={setSearchText}
                        style={styles.searchInput}
                        right={searchText ? <TextInput.Icon icon="close" color={colors.primary} onPress={() => setSearchText('')} /> : null}
                    />
                </View>

                <Card style={[styles.card, styles.subCard]}>
                    <Card.Title
                        title={t("project_manager_list")}
                        titleStyle={styles.cardTitle}
                        right={(props) => (
                            <Text style={styles.resultCount}>{filteredData?.length} {t("result")}</Text>
                        )}
                    />
                    <View style={styles.tableWrapper}>
                        <ScrollView horizontal>
                            <DataTable style={styles.table}>
                                <DataTable.Header style={styles.tableHeader}>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader1}>Proje Sorumlusu</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader2}>Proje Adı</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader3}>DGT Kodu</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader4}>Sorumlu Kişi</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader5}>Seri No</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader6}>Üretim Adedi</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader7}>Süre</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader8}>Tarih</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader9}>Kalan Süre</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader10}>Dosya Yükle</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader11}>Açıklama</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader12}>Tarih/Saat</DataTable.Title>
                                </DataTable.Header>

                                {filteredData?.slice(from1, to1).map((item) => {
                                    const { progress, remainingDays, totalDays } = calculateProgress(item);

                                    return (
                                        <DataTable.Row key={item.id} style={[styles.tableRow, selectedProject?.id === item.id && styles.selectedRow]} onPress={() => handleRowPress(item)}>
                                            <DataTable.Cell style={styles.tableCell1}>
                                                <View style={styles.avatarContainer}>
                                                    <Avatar.Image size={40} style={styles.avatar} source={{ uri: `${URL}${item?.personInCharge?.file}` }} />
                                                    <Text style={styles.cellText}>{item?.personInCharge?.firstName} {item?.personInCharge?.lastName}</Text>
                                                </View>
                                            </DataTable.Cell>
                                            <DataTable.Cell style={styles.tableCell2}><Text style={styles.cellText}>{item?.projectName}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.tableCell3}><Text style={styles.cellText}>{item?.partCode}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.tableCell4}>
                                                <View style={styles.avatarContainer}>
                                                    <Avatar.Image size={40} style={styles.avatar} source={{ uri: `${URL}${item?.responible?.file}` }} />
                                                    <Text style={styles.cellText}>{item?.responible?.firstName} {item?.responible?.lastName}</Text>
                                                </View>
                                            </DataTable.Cell>
                                            <DataTable.Cell style={styles.tableCell5}><Text style={styles.cellText}>{item.serialNumber}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.tableCell6}><Text style={styles.cellText}>{item.productionQuantity}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.tableCell7}><Text style={styles.cellText}>{item.time}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.tableCell8}><Text style={styles.cellText}>{new Date(item.date).toLocaleDateString("tr-TR")}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.tableCell9}><ProgressBar progress={item.time} totalDays={item.date} remainingDays={item.time} /></DataTable.Cell>
                                            <DataTable.Cell style={styles.tableCell10}>
                                                <Button
                                                    mode="outlined"
                                                    compact
                                                    onPress={() => {
                                                        if (!selectedRow && filteredData?.length > 0) {
                                                            setSelectedRow(filteredData[0]);
                                                        }
                                                        setFileModalVisible(true);
                                                    }}
                                                    icon="file-upload"
                                                    style={styles.tableButton}
                                                    labelStyle={styles.tableButtonLabel}
                                                    textColor={colors.primary}
                                                    buttonColor="transparent"
                                                >
                                                    Yükle
                                                </Button>
                                            </DataTable.Cell>
                                            <DataTable.Cell style={styles.tableCell11}><Text style={styles.cellText}>{item.description}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.tableCell12}><Text style={styles.cellText}>{new Date(item.operatorDate).toLocaleDateString("tr-TR")}</Text></DataTable.Cell>
                                        </DataTable.Row>
                                    );
                                })}

                                {filteredData?.length === 0 && (
                                    <DataTable.Row style={styles.emptyRow}>
                                        <DataTable.Cell style={{ flex: 12, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={styles.emptyMessage}>{t("not_result")}</Text>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )}
                            </DataTable>
                        </ScrollView>
                    </View>

                    <DataTable.Pagination
                        page={page1}
                        numberOfPages={Math.ceil(filteredData?.length / itemsPerPage)}
                        onPageChange={(page) => setPage1(page)}
                        label={`${from1 + 1}-${to1} / ${filteredData?.length}`}
                        showFastPaginationControls
                        style={{ margin: 0, padding: 0 }}
                    />
                </Card>

                {showSuccessTable && selectedProject && (
                    <Card style={[styles.card, styles.subCard]}>
                        <Card.Title
                            title="Başarılı Durumlar Listesi"
                            subtitle={`${selectedProject.projectName} - ${selectedProject.responible?.firstName} ${selectedProject.responible?.lastName}`}
                            titleStyle={styles.cardTitle}
                            subtitleStyle={styles.cardSubtitle}
                        />
                        <View style={styles.tableWrapper}>
                            <ScrollView horizontal>
                                <DataTable style={styles.table}>
                                    <DataTable.Header style={styles.table2Header}>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column2Header1}>Teknisyen Adı</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column2Header2}>Açıklama</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column2Header3}>DGT Parça Kodu</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column2Header4}>Durumu</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column2Header5}>Onay</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column2Header6}>Bekleyen Adet</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column2Header8}>Tarih</DataTable.Title>
                                    </DataTable.Header>

                                    {selectedProject?.basariliDurumlar.slice(from2, to2).map((item) => (
                                        <DataTable.Row key={item.id} style={styles.table2Row} onPress={() => handleSuccessRowPress(item)}>
                                            <DataTable.Cell style={styles.table2Cell1}><Text style={styles.cellText}>{item.operator ? item.operator?.firstName : item.user?.firstName} {item.operator ? item.operator?.lastName : item.user?.lastName}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.table2Cell2}><Text style={styles.cellText}>{item.description}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.table2Cell3}><Text style={styles.cellText}>{item.partCode}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.table2Cell4}><StatusTag durum={Boolean(item.status)} /></DataTable.Cell>
                                            <DataTable.Cell style={styles.table2Cell5}><Text style={styles.cellText}>{item.approval}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.table2Cell6}><Text style={styles.cellText}>{item.productionQuantity}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.table2Cell8}><Text style={styles.cellText}>{new Date(item.date).toLocaleDateString("tr-TR")}</Text></DataTable.Cell>
                                        </DataTable.Row>
                                    ))}
                                </DataTable>
                            </ScrollView>
                        </View>

                        {selectedProject?.basariliDurumlar.length > 0 && (
                            <DataTable.Pagination
                                page={page2}
                                numberOfPages={Math.ceil(selectedProject.basariliDurumlar.length / itemsPerPage)}
                                onPageChange={(page) => setPage2(page)}
                                label={`${from2 + 1}-${to2} / ${selectedProject.basariliDurumlar.length}`}
                                showFastPaginationControls
                                numberOfItemsPerPage={itemsPerPage}
                                style={styles.pagination}
                            />
                        )}
                    </Card>
                )}

                {showFailureTable && selectedProject && (
                    <Card style={[styles.card, styles.subCard]}>
                        <Card.Title
                            title="Uygunsuzluk Tespit Listesi"
                            subtitle={`${selectedProject.projectName} - ${selectedProject.responible?.firstName} ${selectedProject.responible?.lastName}`}
                            titleStyle={styles.cardTitle}
                            subtitleStyle={styles.cardSubtitle}
                        />
                        <View style={styles.tableWrapper}>
                            <ScrollView horizontal={true}>
                                <DataTable style={styles.table}>
                                    <DataTable.Header style={styles.table3Header}>
                                        {/* <DataTable.Title textStyle={styles.headerText} style={styles.column3Header1}>Uygunsuzluk Tespit</DataTable.Title> */}
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column3Header2}>Teknisyen Adı</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column3Header3}>DGT Parça Kodu</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column3Header4}>Durumu</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column3Header5}>Bekleyen Adet</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column3Header6}>Açıklama</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={{ minWidth: 120 }}>Kalite Notu</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={{ minWidth: 140 }}>Kalite Sorumlusu</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={{ minWidth: 140 }}>Kalite Notu Tarihi</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={{ minWidth: 120 }}>CMM Notu</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={{ minWidth: 140 }}>CMM Sorumlusu</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={{ minWidth: 140 }}>CMM Notu Tarihi</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column3Header7}>Tarih</DataTable.Title>
                                    </DataTable.Header>

                                    {selectedProject?.basarisizDurumlar.slice(from3, to3).map((item) => (
                                        <DataTable.Row key={item.id} style={styles.table3Row} onPress={() => handleFailureRowPress(item)}>
                                            {/* <DataTable.Cell style={styles.table3Cell1}><Text style={styles.cellText}>{item.inappropriateness}</Text></DataTable.Cell> */}
                                            <DataTable.Cell style={styles.table3Cell2}><Text style={styles.cellText}>{item.operator ? item.operator?.firstName : item.user?.firstName} {item.operator ? item.operator?.lastName : item.user?.lastName}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.table3Cell3}><Text style={styles.cellText}>{item.partCode}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.table3Cell4}><StatusTag durum={Boolean(item.status)} /></DataTable.Cell>
                                            <DataTable.Cell style={styles.table3Cell5}><Text style={styles.cellText}>{item.productionQuantity}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.table3Cell6}><Text style={styles.cellText}>{item.description}</Text></DataTable.Cell>
                                            <DataTable.Cell style={{ minWidth: 120 }}>
                                                {item.qualityOfficerDescription ? (
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text style={[styles.cellText, { flex: 1 }]} numberOfLines={1}>
                                                            {item.qualityOfficerDescription}
                                                        </Text>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setSelectedFailureId(item.id);
                                                                setQualityNoteText(item.qualityOfficerDescription || '');
                                                                setQualityNoteModal(false);
                                                                setTimeout(() => setQualityNoteModal(true), 50);
                                                            }}
                                                            style={{ marginLeft: 8, padding: 4 }}
                                                        >
                                                            <Ionicons name="pencil" size={20} color={colors.primary} />
                                                        </TouchableOpacity>
                                                    </View>
                                                ) : (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setSelectedFailureId(item.id);
                                                            setQualityNoteText('');
                                                            setQualityNoteModal(true);
                                                        }}
                                                        style={{ padding: 4, backgroundColor: colors.primary, borderRadius: 6 }}
                                                    >
                                                        <Text style={{ color: '#fff', fontSize: 13 }}>Not Ekle</Text>
                                                    </TouchableOpacity>
                                                )}
                                            </DataTable.Cell>
                                            <DataTable.Cell style={{ minWidth: 120 }}>
                                                <Text style={styles.cellText}>{item?.qualityOfficer?.firstName} {item?.qualityOfficer?.lastName}</Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell style={{ minWidth: 140 }}>
                                                <Text style={styles.cellText}>
                                                    {item.qualityDescriptionDate
                                                        ? new Date(item.qualityDescriptionDate).toLocaleDateString('tr-TR')
                                                        : '-'}
                                                </Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell style={{ minWidth: 120 }}>
                                                {item.cmmDescription ? (
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text style={[styles.cellText, { flex: 1 }]} numberOfLines={1}>
                                                            {item.cmmDescription}
                                                        </Text>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setSelectedCmmFailureId(item.id);
                                                                setCmmNoteText(item.cmmDescription || '');
                                                                setCmmNoteModal(false);
                                                                setTimeout(() => setCmmNoteModal(true), 50);
                                                            }}
                                                            style={{ marginLeft: 8, padding: 4 }}
                                                        >
                                                            <Ionicons name="pencil" size={20} color={colors.primary} />
                                                        </TouchableOpacity>
                                                    </View>
                                                ) : (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setSelectedCmmFailureId(item.id);
                                                            setCmmNoteText('');
                                                            setCmmNoteModal(true);
                                                        }}
                                                        style={{ padding: 4, backgroundColor: colors.primary, borderRadius: 6 }}
                                                    >
                                                        <Text style={{ color: '#fff', fontSize: 13 }}>CMM Notu Ekle</Text>
                                                    </TouchableOpacity>
                                                )}
                                            </DataTable.Cell>
                                            <DataTable.Cell style={{ minWidth: 120 }}>
                                                <Text style={styles.cellText}>{item?.cmmUser?.firstName} {item?.cmmUser?.lastName}</Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell style={{ minWidth: 140 }}>
                                                <Text style={styles.cellText}>
                                                    {item.cmmDescriptionDate
                                                        ? new Date(item.cmmDescriptionDate).toLocaleDateString('tr-TR')
                                                        : '-'}
                                                </Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell style={styles.table3Cell7}><Text style={styles.cellText}>{new Date(item.date).toLocaleDateString("tr-TR")}</Text></DataTable.Cell>
                                        </DataTable.Row>
                                    ))}
                                </DataTable>
                            </ScrollView>
                        </View>

                        {selectedProject?.basarisizDurumlar.length > 0 && (
                            <DataTable.Pagination
                                page={page3}
                                numberOfPages={Math.ceil(selectedProject.basarisizDurumlar.length / itemsPerPage)}
                                onPageChange={(page) => setPage3(page)}
                                label={`${from3 + 1}-${to3} / ${selectedProject.basarisizDurumlar.length}`}
                                showFastPaginationControls
                                numberOfItemsPerPage={itemsPerPage}
                                style={styles.pagination}
                            />
                        )}
                    </Card>
                )}

                <Portal>
                    <Modal visible={fileModalVisible} onDismiss={() => !isUploading && setFileModalVisible(false)} contentContainerStyle={styles.modal}>
                        <Text style={styles.modalTitle}>Dosya Yükleme</Text>
                        <Text style={styles.modalText}>Proje: {selectedRow?.projectName}</Text>
                        <Text style={styles.modalText}>Parça Kodu: {selectedRow?.partCode}</Text>

                        {isUploading ? (
                            <View style={styles.uploadingContainer}>
                                <ActivityIndicator size="large" color={colors.primary} />
                                <Text style={styles.uploadingText}>Dosyalar Yükleniyor...</Text>
                            </View>
                        ) : (
                            <View style={styles.modalButtons}>
                                <Button
                                    mode="outlined"
                                    onPress={() => setFileModalVisible(false)}
                                    style={styles.modalButton}
                                    textColor={colors.primary}
                                >
                                    İptal
                                </Button>
                                <Button
                                    mode="contained"
                                    onPress={handleFileUpload}
                                    style={styles.modalButton}
                                    buttonColor={colors.primary}
                                >
                                    Dosya Seç ve Yükle
                                </Button>
                            </View>
                        )}
                    </Modal>
                </Portal>

                {selectedProject && (
                    <Card style={styles.noteCard}>
                        <Card.Content>
                            <View style={styles.noteHeader}>
                                <Text style={styles.noteTitle}>{t("add_note")} ({selectedProject.projectName})</Text>
                            </View>
                            <TextInput
                                mode="outlined"
                                label={t("part_code")}
                                value={formData.partCode}
                                onChangeText={text => setFormData(prev => ({ ...prev, partCode: text }))}
                                multiline
                                numberOfLines={2}
                                style={styles.noteInput}
                                outlineColor={colors.primaryLight}
                                activeOutlineColor={colors.primary}
                                textColor={colors.primary}
                            />
                            <TextInput
                                mode="outlined"
                                label={t("description")}
                                value={formData.description}
                                onChangeText={text => setFormData(prev => ({ ...prev, description: text }))}
                                multiline
                                numberOfLines={2}
                                style={styles.noteInput}
                                outlineColor={colors.primaryLight}
                                activeOutlineColor={colors.primary}
                                textColor={colors.primary}
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                                <Text style={{ marginRight: 8 }}>{t('inappropriateness')}</Text>
                                <Switch
                                    value={formData.status}
                                    onValueChange={val => setFormData(prev => ({ ...prev, status: val }))}
                                    color={colors.primary}
                                />
                            </View>
                            <Button
                                mode="contained"
                                onPress={() => handleSaveNote(selectedProject)}
                                style={styles.saveButton}
                                buttonColor={colors.primary}
                            >
                                {t("save_note")}
                            </Button>
                        </Card.Content>
                    </Card>
                )}
            </ScrollView>
            <Portal>
                <Modal
                    visible={qualityNoteModal}
                    onDismiss={() => {
                        setQualityNoteModal(false);
                        setQualityNoteText('');
                        setSelectedFailureId(null);
                    }}
                    contentContainerStyle={styles.qualityModalBox}
                >
                    <View style={styles.qualityModalHeader}>
                        <Text style={styles.qualityModalTitle}>
                            {selectedFailureId && qualityNoteText
                                ? t('update_quality_note')
                                : t('add_quality_note')}
                        </Text>
                        <TouchableOpacity onPress={() => {
                            setQualityNoteModal(false);
                            setQualityNoteText('');
                            setSelectedFailureId(null);
                        }}>
                            <Ionicons name="close" size={28} color={colors.primary} />
                        </TouchableOpacity>
                    </View>
                    <Divider style={{ marginVertical: 8 }} />
                    <Text style={{ color: '#888', marginBottom: 8, fontSize: 14 }}>
                        {t('quality_note_modal_info')}
                    </Text>
                    <TextInput
                        label={t('quality_note')}
                        value={qualityNoteText}
                        onChangeText={setQualityNoteText}
                        mode="outlined"
                        style={styles.qualityModalInput}
                        multiline
                        outlineColor={colors.primaryLight}
                        activeOutlineColor={colors.primary}
                        textColor={colors.primary}
                        placeholder={t('write_quality_note')}
                        numberOfLines={4}
                    />
                    <Button
                        mode="contained"
                        onPress={async () => {
                            if (!qualityNoteText.trim()) {
                                Alert.alert(t('error'), t('please_fill_fields'));
                                return;
                            }
                            setQualityNoteLoading(true);
                            const formData = {
                                qualityOfficerDescription: qualityNoteText,
                                qualityDescriptionDate: new Date().toISOString()
                            };
                            await dispatch(fetchTechnicalDrawingQualityDescription({ formData, id: selectedFailureId }));
                            const updated = await dispatch(fetchTechnicalDrawingGet({ id: selectedProject.id }));
                            if (updated.payload) {
                                setSelectedProject(updated.payload);
                            }
                            setQualityNoteLoading(false);
                            setQualityNoteModal(false);
                            setQualityNoteText('');
                            setSelectedFailureId(null);
                            Alert.alert(t('success'), t('quality_note_updated'));
                        }}
                        loading={qualityNoteLoading}
                        disabled={qualityNoteLoading}
                        style={styles.qualityModalButton}
                        buttonColor={colors.primary}
                        contentStyle={{ height: 48 }}
                        labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
                    >
                        {selectedFailureId && qualityNoteText ? t('update') : t('add')}
                    </Button>
                </Modal>
            </Portal>
            <Portal>
                <Modal
                    visible={cmmNoteModal}
                    onDismiss={() => setCmmNoteModal(false)}
                    contentContainerStyle={styles.qualityModalBox}
                >
                    <View style={styles.qualityModalHeader}>
                        <Text style={styles.qualityModalTitle}>
                            {selectedCmmFailureId && cmmNoteText
                                ? t('update_cmm_note')
                                : t('add_cmm_note')}
                        </Text>
                        <TouchableOpacity onPress={() => setCmmNoteModal(false)}>
                            <Ionicons name="close" size={28} color={colors.primary} />
                        </TouchableOpacity>
                    </View>
                    <Divider style={{ marginVertical: 8 }} />
                    <Text style={{ color: '#888', marginBottom: 8, fontSize: 14 }}>
                        {t('cmm_note_modal_info')}
                    </Text>
                    <TextInput
                        label={t('cmm_note')}
                        value={cmmNoteText}
                        onChangeText={setCmmNoteText}
                        mode="outlined"
                        style={styles.qualityModalInput}
                        multiline
                        outlineColor={colors.primaryLight}
                        activeOutlineColor={colors.primary}
                        textColor={colors.primary}
                        placeholder={t('write_cmm_note')}
                        numberOfLines={4}
                    />
                    <Button
                        mode="contained"
                        onPress={async () => {
                            if (!cmmNoteText.trim()) {
                                Alert.alert(t('error'), t('please_fill_fields'));
                                return;
                            }
                            setCmmNoteLoading(true);
                            const formData = {
                                cmmDescription: cmmNoteText,
                                cmmDescriptionDate: new Date().toISOString()
                            };
                            await dispatch(fetchTechnicalDrawingCMMDescription({ formData, id: selectedCmmFailureId }));
                            const updated = await dispatch(fetchTechnicalDrawingGet({ id: selectedProject.id }));
                            if (updated.payload) {
                                setSelectedProject(updated.payload);
                            }
                            setCmmNoteLoading(false);
                            setCmmNoteModal(false);
                            Alert.alert(t('success'), t('cmm_note_updated'));
                        }}
                        loading={cmmNoteLoading}
                        disabled={cmmNoteLoading}
                        style={styles.qualityModalButton}
                        buttonColor={colors.primary}
                        contentStyle={{ height: 48 }}
                        labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
                    >
                        {selectedCmmFailureId && cmmNoteText ? t('update') : t('add')}
                    </Button>
                </Modal>
            </Portal>
        </View>
    );
};

export default ProjectTable;