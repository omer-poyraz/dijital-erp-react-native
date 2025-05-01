import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { DataTable, Text, Card, Button, TextInput, Portal, Modal, Avatar, Switch } from 'react-native-paper';
import { colors } from '../../utilities/colors';
import { useTranslation } from 'react-i18next';
import StatusTag from './statusTag';
import ProgressBar from '../../components/chart/progressBar';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { styles } from './styles';
import { fetchAssemblyManualAddFile } from '../../redux/slices/assemblyManualAddFileSlice';
import * as DocumentPicker from 'expo-document-picker';
import { URL } from '../../api';
import { fetchAssemblyManualGetAll } from '../../redux/slices/assemblyManualGetAllSlice';
import { useNavigation } from '@react-navigation/native';
import { fetchAssemblyNoteCreate } from '../../redux/slices/assemblyNoteCreateSlice';
import { fetchAssemblyManualGet } from '../../redux/slices/assemblyManualGetSlice';

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
    const assemblyManualGetAll = useSelector(state => state.assemblyManualGetAll.data);
    const [formData, setFormData] = useState({ note: "", description: "", status: true, partCode: "" });
    const { t } = useTranslation()
    const [isUploading, setIsUploading] = useState(false);
    const dispatch = useDispatch();
    const uploadStatus = useSelector(state => state.assemblyManualAddFile.status);
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
        setFilteredData(assemblyManualGetAll);
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
                item.responible?.name.toLowerCase().includes(searchLower) ||
                item.responible?.surname.toLowerCase().includes(searchLower) ||
                item.personInCharge?.name.toLowerCase().includes(searchLower) ||
                item.personInCharge?.surname.toLowerCase().includes(searchLower) ||
                item.description.toLowerCase().includes(searchLower)
            );
        }

        setFilteredData(result);
        setPage1(0);
    };

    const handleRowPress = (item) => {
        if (selectedProject?.id === item.id) {
            navigation.navigate('AssemblyManualDetail', { id: item.id });
        }
        setSelectedProject(item);
        setShowSuccessTable(item.basariliDurumlar.length > 0);
        setShowFailureTable(item.basarisizDurumlar.length > 0);
    };

    const handleSuccessRowPress = (item) => {
        navigation.navigate('AssemblySuccessDetail', { id: item.id });
    };

    const handleFailureRowPress = (item) => {
        navigation.navigate('AssemblyFailureDetail', { id: item.id });
    };

    const handleFileUpload = async () => {
        if (!selectedRow) {
            alert("Lütfen önce bir satır seçin!");
            return;
        }
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ["image/*", "application/pdf"],
                multiple: true,
                copyToCacheDirectory: true
            });

            if (result.canceled) return;

            setIsUploading(true);

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

            await dispatch(fetchAssemblyManualAddFile({ formData: formData, id: selectedRow.id }));
            await dispatch(fetchAssemblyManualGetAll());

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
            alert(`Dosya yükleme sırasında bir hata oluştu: ${error.message}`);
            setIsUploading(false);
            setFileModalVisible(false);
        }
    };

    const handleSaveNote = async () => {
        await dispatch(fetchAssemblyNoteCreate({ formData: formData, manualId: selectedProject.id }));
        var data = await dispatch(fetchAssemblyManualGet({ id: selectedProject.id }));
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
    const to1 = Math.min((page1 + 1) * itemsPerPage, assemblyManualGetAll?.length);

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
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader1}>Proje Yöneticisi</DataTable.Title>
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
                                        <DataTable.Row key={item.id} style={[styles.tableRow, selectedProject?.id === item?.id && styles.selectedRow]} onPress={() => handleRowPress(item)}>
                                            <DataTable.Cell style={styles.tableCell1}>
                                                <View style={styles.avatarContainer}>
                                                    <Avatar.Image size={40} style={styles.avatar} source={{ uri: `${URL}${item?.personInCharge?.file}` }} />
                                                    <Text style={styles.cellText}>{item?.personInCharge?.name} {item?.personInCharge?.surname}</Text>
                                                </View>     
                                            </DataTable.Cell>
                                            <DataTable.Cell style={styles.tableCell2}><Text style={styles.cellText}>{item?.projectName}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.tableCell3}><Text style={styles.cellText}>{item?.partCode}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.tableCell4}>
                                                <View style={styles.avatarContainer}>
                                                    <Avatar.Image size={40} style={styles.avatar} source={{ uri: `${URL}${item?.responible?.file}` }} />
                                                    <Text style={styles.cellText}>{item?.responible?.name} {item?.responible?.surname}</Text>
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
                                            <DataTable.Cell style={styles.tableCell12}><Text style={styles.cellText}>{new Date(item.technicianDate).toLocaleDateString("tr-TR")}</Text></DataTable.Cell>
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
                            subtitle={`${selectedProject.projectName} - ${selectedProject.responible?.name} ${selectedProject.responible?.surname}`}
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
                                            <DataTable.Cell style={styles.table2Cell1}><Text style={styles.cellText}>{item.technician ? item.technician?.name : item.user?.firstName} {item.technician ? item.technician?.surname : item.user?.lastName}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.table2Cell2}><Text style={styles.cellText}>{item.description}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.table2Cell3}><Text style={styles.cellText}>{item.partCode}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.table2Cell4}><StatusTag durum={Boolean(item.status)} /></DataTable.Cell>
                                            <DataTable.Cell style={styles.table2Cell5}><Text style={styles.cellText}>{item.approval}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.table2Cell6}><Text style={styles.cellText}>{item.pendingQuantity}</Text></DataTable.Cell>
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
                            subtitle={`${selectedProject.projectName} - ${selectedProject.responible?.name} ${selectedProject.responible?.surname}`}
                            titleStyle={styles.cardTitle}
                            subtitleStyle={styles.cardSubtitle}
                        />
                        <View style={styles.tableWrapper}>
                            <ScrollView horizontal>
                                <DataTable style={styles.table}>
                                    <DataTable.Header style={styles.table3Header}>
                                        {/* <DataTable.Title textStyle={styles.headerText} style={styles.column3Header1}>Uygunsuzluk Tespit</DataTable.Title> */}
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column3Header2}>Teknisyen Adı</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column3Header3}>DGT Parça Kodu</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column3Header4}>Durumu</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column3Header5}>Bekleyen Adet</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column3Header6}>Açıklama</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column3Header7}>Tarih</DataTable.Title>
                                    </DataTable.Header>

                                    {selectedProject?.basarisizDurumlar.slice(from3, to3).map((item) => (
                                        <DataTable.Row key={item.id} style={styles.table3Row} onPress={() => handleFailureRowPress(item)}>
                                            {/* <DataTable.Cell style={styles.table3Cell1}><Text style={styles.cellText}>{item.inappropriateness}</Text></DataTable.Cell> */}
                                            <DataTable.Cell style={styles.table3Cell2}><Text style={styles.cellText}>{item.technician ? item.technician?.name : item.user?.firstName} {item.technician ? item.technician?.surname : item.user?.lastName}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.table3Cell3}><Text style={styles.cellText}>{item.partCode}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.table3Cell4}><StatusTag durum={Boolean(item.status)} /></DataTable.Cell>
                                            <DataTable.Cell style={styles.table3Cell5}><Text style={styles.cellText}>{item.pendingQuantity}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.table3Cell6}><Text style={styles.cellText}>{item.qualityDescription}</Text></DataTable.Cell>
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
        </View>
    );
};

export default ProjectTable;