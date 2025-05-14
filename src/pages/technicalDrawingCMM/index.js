import { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { DataTable, Text, Card, Button, TextInput, Modal, Portal, Divider, ActivityIndicator } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { styles } from "../assemblyManual/styles";
import { fetchTechnicalDrawingFailureGetAllByCMM } from "../../redux/slices/technicalDrawingFailureGetAllByCMMSlice";
import { fetchTechnicalDrawingCMMDescription } from "../../redux/slices/technicalDrawingCMMDescriptionSlice";
import StatusTag from "../assemblyManual/statusTag";

const itemsPerPage = 5;

const TechnicalDrawingCMMPage = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { data: failureData, status } = useSelector(state => state.technicalDrawingFailureGetAllByCMM);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(0);
    const [cmmNoteModal, setCMMNoteModal] = useState(false);
    const [cmmNoteText, setCMMNoteText] = useState("");
    const [selectedFailureId, setSelectedFailureId] = useState(null);
    const [cmmNoteLoading, setCMMNoteLoading] = useState(false);

    useEffect(() => {
        setFilteredData(Array.isArray(failureData) ? failureData : []);
    }, [failureData]);

    useEffect(() => {
        if (failureData) {
            setFilteredData(failureData);
        }
    }, [failureData]);

    const getData = async () => {
        await dispatch(fetchTechnicalDrawingFailureGetAllByCMM());
    }

    useEffect(() => { getData() }, [dispatch])

    useEffect(() => {
        if (!failureData) return;
        let result = [...failureData];
        if (searchText) {
            const searchLower = searchText.toLowerCase();
            result = result.filter(item =>
                (item.projectName || "").toLowerCase().includes(searchLower) ||
                (item.partCode || "").toLowerCase().includes(searchLower) ||
                (item.serialNumber || "").toLowerCase().includes(searchLower) ||
                (item.responible?.firstName || "").toLowerCase().includes(searchLower) ||
                (item.responible?.lastName || "").toLowerCase().includes(searchLower) ||
                (item.description || "").toLowerCase().includes(searchLower)
            );
        }
        setFilteredData(result);
        setPage(0);
    }, [searchText, failureData]);

    const handleSaveCMMNote = async () => {
        if (!cmmNoteText.trim()) {
            Alert.alert(t('error'), t('please_fill_fields'));
            return;
        }
        setCMMNoteLoading(true);
        const formData = {
            cmmDescription: cmmNoteText,
            cmmDescriptionDate: new Date().toISOString()
        };
        await dispatch(fetchTechnicalDrawingCMMDescription({ formData, id: selectedFailureId }));
        await dispatch(fetchTechnicalDrawingFailureGetAllByCMM());
        setCMMNoteLoading(false);
        setCMMNoteModal(false);
        setCMMNoteText("");
        setSelectedFailureId(null);
        Alert.alert(t('success'), t('cmm_note_updated'));
    };

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, filteredData?.length || 0);

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
                        right={searchText ? <TextInput.Icon icon="close" color="#1976d2" onPress={() => setSearchText('')} /> : null}
                    />
                </View>

                <Card style={[styles.card, styles.subCard]}>
                    <Card.Title
                        title={t("failure_list")}
                        titleStyle={styles.cardTitle}
                        right={() => (
                            <Text style={styles.resultCount}>{filteredData?.length} {t("result")}</Text>
                        )}
                    />
                    <View style={styles.tableWrapper}>
                        {status === "loading" ? (
                            <View style={{ padding: 32, alignItems: "center" }}>
                                <ActivityIndicator size="large" color="#1976d2" />
                            </View>
                        ) : (
                            <ScrollView horizontal>
                                <DataTable style={styles.table}>
                                    <DataTable.Header style={styles.table3Header}>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column3Header2}>{t("technician")}</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column3Header3}>{t("part_code")}</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column3Header4}>{t("status")}</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column3Header5}>{t("pending_qty")}</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column3Header6}>{t("description")}</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={{ minWidth: 120 }}>{t("cmm_note")}</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={{ minWidth: 140 }}>{t("cmm_note_date")}</DataTable.Title>
                                        <DataTable.Title textStyle={styles.headerText} style={styles.column3Header7}>{t("date")}</DataTable.Title>
                                    </DataTable.Header>

                                    {filteredData?.slice(from, to).map((item) => (
                                        <DataTable.Row key={item.id} style={styles.table3Row}>
                                            <DataTable.Cell style={styles.table3Cell2}>
                                                <Text style={styles.cellText}>
                                                    {item.technician ? `${item.technician.firstName} ${item.technician.lastName}` : item.user ? `${item.user.firstName} ${item.user.lastName}` : "-"}
                                                </Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell style={styles.table3Cell3}><Text style={styles.cellText}>{item.partCode}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.table3Cell4}><StatusTag durum={Boolean(item.status)} /></DataTable.Cell>
                                            <DataTable.Cell style={styles.table3Cell5}><Text style={styles.cellText}>{item.pendingQuantity}</Text></DataTable.Cell>
                                            <DataTable.Cell style={styles.table3Cell6}><Text style={styles.cellText}>{item.description}</Text></DataTable.Cell>
                                            <DataTable.Cell style={{ minWidth: 120 }}>
                                                {item.cmmDescription ? (
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text style={[styles.cellText, { flex: 1 }]} numberOfLines={1}>
                                                            {item.cmmDescription}
                                                        </Text>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setSelectedFailureId(item.id);
                                                                setCMMNoteText(item.cmmDescription);
                                                                setCMMNoteModal(true);
                                                            }}
                                                            style={{ marginLeft: 8, padding: 4 }}
                                                        >
                                                            <Ionicons name="pencil" size={20} color="#1976d2" />
                                                        </TouchableOpacity>
                                                    </View>
                                                ) : (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setSelectedFailureId(item.id);
                                                            setCMMNoteText('');
                                                            setCMMNoteModal(true);
                                                        }}
                                                        style={{ padding: 4, backgroundColor: "#1976d2", borderRadius: 6 }}
                                                    >
                                                        <Text style={{ color: '#fff', fontSize: 13 }}>{t("add_note")}</Text>
                                                    </TouchableOpacity>
                                                )}
                                            </DataTable.Cell>
                                            <DataTable.Cell style={{ minWidth: 140 }}>
                                                <Text style={styles.cellText}>
                                                    {item.cmmDescriptionDate
                                                        ? new Date(item.cmmDescriptionDate).toLocaleDateString('tr-TR')
                                                        : '-'}
                                                </Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell style={styles.table3Cell7}>
                                                <Text style={styles.cellText}>{item.date ? new Date(item.date).toLocaleDateString("tr-TR") : "-"}</Text>
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                    ))}

                                    {filteredData?.length === 0 && (
                                        <DataTable.Row style={styles.emptyRow}>
                                            <DataTable.Cell style={{ flex: 8, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={styles.emptyMessage}>{t("not_result")}</Text>
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                    )}
                                </DataTable>
                            </ScrollView>
                        )}
                    </View>

                    <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.ceil((filteredData?.length || 0) / itemsPerPage)}
                        onPageChange={setPage}
                        label={`${from + 1}-${to} / ${filteredData?.length || 0}`}
                        showFastPaginationControls
                        numberOfItemsPerPage={itemsPerPage}
                        style={styles.pagination}
                    />
                </Card>
            </ScrollView>

            <Portal>
                <DataTable />
                <Card />
                <Modal
                    visible={cmmNoteModal}
                    onDismiss={() => setCMMNoteModal(false)}
                    contentContainerStyle={styles.qualityModalBox}
                >
                    <View style={styles.qualityModalHeader}>
                        <Text style={styles.qualityModalTitle}>
                            {selectedFailureId && cmmNoteText
                                ? t('update_cmm_note')
                                : t('add_cmm_note')}
                        </Text>
                        <TouchableOpacity onPress={() => setCMMNoteModal(false)}>
                            <Ionicons name="close" size={28} color="#1976d2" />
                        </TouchableOpacity>
                    </View>
                    <Divider style={{ marginVertical: 8 }} />
                    <Text style={{ color: '#888', marginBottom: 8, fontSize: 14 }}>
                        {t('cmm_note_modal_info')}
                    </Text>
                    <TextInput
                        label={t('cmm_note')}
                        value={cmmNoteText}
                        onChangeText={setCMMNoteText}
                        mode="outlined"
                        style={styles.qualityModalInput}
                        multiline
                        outlineColor="#90caf9"
                        activeOutlineColor="#1976d2"
                        textColor="#1976d2"
                        placeholder={t('write_cmm_note')}
                        numberOfLines={4}
                    />
                    <Button
                        mode="contained"
                        onPress={handleSaveCMMNote}
                        loading={cmmNoteLoading}
                        disabled={cmmNoteLoading}
                        style={styles.qualityModalButton}
                        buttonColor="#1976d2"
                        contentStyle={{ height: 48 }}
                        labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
                    >
                        {selectedFailureId && cmmNoteText ? t('update') : t('add')}
                    </Button>
                </Modal>
            </Portal>
        </View>
    );
};

export default TechnicalDrawingCMMPage;