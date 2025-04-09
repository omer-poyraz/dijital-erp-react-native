import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { DataTable, Text, Card, Button, TextInput, Portal, Modal, Avatar } from 'react-native-paper';
import { projectData } from '../../utilities/projectData';
import { colors } from '../../utilities/colors';
import { useTranslation } from 'react-i18next';
import StatusTag from './statusTag';
import ProgressBar from '../../components/chart/progressBar';
import { Ionicons } from '@expo/vector-icons';

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
    const [noteText, setNoteText] = useState('');
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(projectData);

    const { t } = useTranslation()

    const isTablet = Dimensions.get('window').width > 600;
    const today = new Date();

    const parseDate = (dateStr) => {
        const parts = dateStr.split('.');
        return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    };

    const daysDifference = (date1, date2) => {
        const diffTime = date2.getTime() - date1.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const calculateProgress = (project) => {
        const startDate = parseDate(project.tarih);
        const totalDays = project.sure;
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + totalDays);

        const remainingDays = daysDifference(today, endDate);
        const elapsedDays = daysDifference(startDate, today);
        const progress = Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100));

        return { progress, remainingDays, totalDays };
    };

    useEffect(() => {
        applyFilters();
    }, [searchText]);

    const applyFilters = () => {
        let result = [...projectData];

        if (searchText) {
            const searchLower = searchText.toLowerCase();
            result = result.filter(item =>
                item.sorumlu.toLowerCase().includes(searchLower) ||
                item.projeAdi.toLowerCase().includes(searchLower) ||
                item.parcaKodu.toLowerCase().includes(searchLower) ||
                item.sorumluKisi.toLowerCase().includes(searchLower) ||
                item.aciklama.toLowerCase().includes(searchLower)
            );
        }

        setFilteredData(result);
        setPage1(0);
    };

    const handleRowPress = (item) => {
        setSelectedProject(item);
        setShowSuccessTable(item.basariliDurumlar.length > 0);
        setShowFailureTable(item.basarisizDurumlar.length > 0);
    };

    const handleFileUpload = (item) => {
        setSelectedRow(item);
        setFileModalVisible(true);
    };

    const handleSaveNote = (item) => {
        alert(`${item.id} ${t("id_note_added")}: ${noteText}`);
        setNoteText('');
    };

    const from1 = page1 * itemsPerPage;
    const to1 = Math.min((page1 + 1) * itemsPerPage, projectData.length);

    const from2 = selectedProject ? (page2 * itemsPerPage) : 0;
    const to2 = selectedProject ? Math.min((page2 + 1) * itemsPerPage, selectedProject.basariliDurumlar.length) : 0;

    const from3 = selectedProject ? (page3 * itemsPerPage) : 0;
    const to3 = selectedProject ? Math.min((page3 + 1) * itemsPerPage, selectedProject.basarisizDurumlar.length) : 0;

    return (
        <View style={styles.page}>
            <View style={styles.filterContainer}>
                <Ionicons name='search-outline' size={20} style={styles.inputIcon} />
                <TextInput
                    mode="outlined"
                    placeholder={t("search2")}
                    value={searchText}
                    onChangeText={setSearchText}
                    style={styles.searchInput}
                    right={
                        searchText ?
                            <TextInput.Icon
                                icon="close"
                                color={colors.primary}
                                onPress={() => setSearchText('')}
                            /> : null
                    }
                />
            </View>

            <Card style={[styles.card, styles.subCard]}>
                <Card.Title
                    title={t("project_manager_list")}
                    titleStyle={styles.cardTitle}
                    right={(props) => (
                        <Text style={styles.resultCount}>{filteredData.length} {t("result")}</Text>
                    )}
                />
                <View style={styles.tableWrapper}>
                    <ScrollView horizontal={!isTablet}>
                        <DataTable style={styles.table}>
                            <DataTable.Header style={styles.tableHeader}>
                                <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader2}>Proje Sorumlusu</DataTable.Title>
                                <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>Proje Adı</DataTable.Title>
                                <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>DGT Kodu</DataTable.Title>
                                <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader2}>Sorumlu Kişi</DataTable.Title>
                                <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>Seri No</DataTable.Title>
                                <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>Üretim Adedi</DataTable.Title>
                                <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>Süre</DataTable.Title>
                                <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>Tarih</DataTable.Title>
                                <DataTable.Title textStyle={styles.headerText} style={[styles.columnHeader, { flex: 1.5 }]}>Kalan Süre</DataTable.Title>
                                <DataTable.Title textStyle={styles.headerText} style={[styles.columnHeader, { flex: 1.5 }]}>Dosya Yükle</DataTable.Title>
                                <DataTable.Title textStyle={styles.headerText} style={[styles.columnHeader, { flex: 3.5 }]}>Açıklama</DataTable.Title>
                                <DataTable.Title textStyle={styles.headerText} style={[styles.columnHeader, { flex: 1.5 }]}>Tarih/Saat</DataTable.Title>
                            </DataTable.Header>

                            {filteredData.slice(from1, to1).map((item) => {
                                const { progress, remainingDays, totalDays } = calculateProgress(item);

                                return (
                                    <DataTable.Row
                                        key={item.id}
                                        style={[
                                            styles.tableRow,
                                            selectedProject?.id === item.id && styles.selectedRow
                                        ]}
                                        onPress={() => handleRowPress(item)}
                                    >
                                        <DataTable.Cell style={styles.tableCell2}>
                                            <View style={styles.avatarContainer}>
                                                <Avatar.Image
                                                    size={40}
                                                    style={styles.avatar}
                                                    source={{ uri: `https://i.pravatar.cc/150?u=${item.id}` }}
                                                />
                                                <Text style={styles.cellText}>{item.sorumlu}</Text>
                                            </View>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}><Text style={styles.cellText}>{item.projeAdi}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}><Text style={styles.cellText}>{item.parcaKodu}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell2}>
                                            <View style={styles.avatarContainer}>
                                                <Avatar.Image
                                                    size={40}
                                                    style={styles.avatar}
                                                    source={{ uri: `https://i.pravatar.cc/150?u=${item.id + 100}` }}
                                                />
                                                <Text style={styles.cellText}>{item.sorumluKisi}</Text>
                                            </View>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}><Text style={styles.cellText}>{item.seriNo}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}><Text style={styles.cellText}>{item.uretimAdedi}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}><Text style={styles.cellText}>{item.sure}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}><Text style={styles.cellText}>{item.tarih}</Text></DataTable.Cell>
                                        <DataTable.Cell style={[styles.tableCell, { flex: 1.5 }]}>
                                            <ProgressBar
                                                progress={progress}
                                                totalDays={totalDays}
                                                remainingDays={remainingDays}
                                            />
                                        </DataTable.Cell>
                                        <DataTable.Cell style={[styles.tableCell, { flex: 1.5 }]}>
                                            <Button
                                                mode="outlined"
                                                compact
                                                onPress={() => handleFileUpload(item)}
                                                icon="file-upload"
                                                style={styles.tableButton}
                                                labelStyle={styles.tableButtonLabel}
                                                textColor={colors.primary}
                                                buttonColor="transparent"
                                            >
                                                Yükle
                                            </Button>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={[styles.tableCell, { flex: 3.5 }]}>
                                            <Text style={styles.cellText}>{item.aciklama}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={[styles.tableCell, { flex: 1.5 }]}>
                                            <Text style={styles.cellText}>{item.teknisyenTarih}</Text>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                );
                            })}

                            {filteredData.length === 0 && (
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
                    numberOfPages={Math.ceil(filteredData.length / itemsPerPage)}
                    onPageChange={(page) => setPage1(page)}
                    label={`${from1 + 1}-${to1} / ${filteredData.length}`}
                    showFastPaginationControls
                    style={{ margin: 0, padding: 0 }}
                />
            </Card>

            {showSuccessTable && selectedProject && (
                <Card style={[styles.card, styles.subCard]}>
                    <Card.Title
                        title="Başarılı Durumlar Listesi"
                        subtitle={`${selectedProject.projeAdi} - ${selectedProject.sorumlu}`}
                        titleStyle={styles.cardTitle}
                        subtitleStyle={styles.cardSubtitle}
                    />
                    <View style={styles.tableWrapper}>
                        <ScrollView horizontal={!isTablet}>
                            <DataTable style={styles.table}>
                                <DataTable.Header style={styles.tableHeader}>
                                    <DataTable.Title textStyle={styles.headerText} style={[styles.columnHeader, { flex: 1.5 }]}>Açıklama Listesi</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>Teknisyen Adı</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>DGT Parça Kodu</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>Durumu</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>Onay</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>Bekleyen Adet</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={[styles.columnHeader, { flex: 1.5 }]}>Açıklama</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>Tarih</DataTable.Title>
                                </DataTable.Header>

                                {selectedProject?.basariliDurumlar.slice(from2, to2).map((item) => (
                                    <DataTable.Row key={item.id} style={styles.tableRow}>
                                        <DataTable.Cell style={[styles.tableCell, { flex: 1.5 }]}><Text style={styles.cellText}>{item.aciklama}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}><Text style={styles.cellText}>{item.teknisyen}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}><Text style={styles.cellText}>{item.parcaKodu}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}>
                                            <StatusTag durum={item.durum} />
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}><Text style={styles.cellText}>{item.onay}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}><Text style={styles.cellText}>{item.bekleyenAdet}</Text></DataTable.Cell>
                                        <DataTable.Cell style={[styles.tableCell, { flex: 1.5 }]}><Text style={styles.cellText}>{item.kaliteAciklama}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}><Text style={styles.cellText}>{item.tarih}</Text></DataTable.Cell>
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
                        subtitle={`${selectedProject.projeAdi} - ${selectedProject.sorumlu}`}
                        titleStyle={styles.cardTitle}
                        subtitleStyle={styles.cardSubtitle}
                    />
                    <View style={styles.tableWrapper}>
                        <ScrollView horizontal={!isTablet}>
                            <DataTable style={styles.table}>
                                <DataTable.Header style={styles.tableHeader}>
                                    <DataTable.Title textStyle={styles.headerText} style={[styles.columnHeader, { flex: 1.5 }]}>Uygunsuzluk Tespit</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>Teknisyen Adı</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>DGT Parça Kodu</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>Durumu</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>Bekleyen Adet</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={[styles.columnHeader, { flex: 1.5 }]}>Açıklama</DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>Tarih</DataTable.Title>
                                </DataTable.Header>

                                {selectedProject?.basarisizDurumlar.slice(from3, to3).map((item) => (
                                    <DataTable.Row key={item.id} style={styles.tableRow}>
                                        <DataTable.Cell style={[styles.tableCell, { flex: 1.5 }]}><Text style={styles.cellText}>{item.uygunsuzluk}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}><Text style={styles.cellText}>{item.teknisyen}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}><Text style={styles.cellText}>{item.parcaKodu}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}>
                                            <StatusTag durum={item.durum} />
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}><Text style={styles.cellText}>{item.bekleyenAdet}</Text></DataTable.Cell>
                                        <DataTable.Cell style={[styles.tableCell, { flex: 1.5 }]}><Text style={styles.cellText}>{item.kaliteAciklama}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}><Text style={styles.cellText}>{item.tarih}</Text></DataTable.Cell>
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
                <Modal visible={fileModalVisible} onDismiss={() => setFileModalVisible(false)} contentContainerStyle={styles.modal}>
                    <Text style={styles.modalTitle}>Dosya Yükleme</Text>
                    <Text style={styles.modalText}>Proje: {selectedRow?.projeAdi}</Text>
                    <Text style={styles.modalText}>Parça Kodu: {selectedRow?.parcaKodu}</Text>
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
                            onPress={() => {
                                alert("Dosya yükleme simülasyonu");
                                setFileModalVisible(false);
                            }}
                            style={styles.modalButton}
                            buttonColor={colors.primary}
                        >
                            Dosya Seç ve Yükle
                        </Button>
                    </View>
                </Modal>
            </Portal>

            {selectedProject && (
                <Card style={styles.noteCard}>
                    <Card.Content>
                        <Text style={styles.noteTitle}>{t("add_note")} ({selectedProject.projeAdi})</Text>
                        <TextInput
                            mode="outlined"
                            label={t("description")}
                            value={noteText}
                            onChangeText={setNoteText}
                            multiline
                            numberOfLines={2}
                            style={styles.noteInput}
                            outlineColor={colors.primaryLight}
                            activeOutlineColor={colors.primary}
                            textColor={colors.primary}
                        />
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
        </View>
    );
};

const styles = StyleSheet.create({
    page: { flex: 1, backgroundColor: '#f5f5f5', padding: 10, width: '100%' },
    card: { marginBottom: 16, borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderColor: colors.cardBorder, elevation: 3, },
    cardTitle: { color: colors.primary, fontSize: 16, fontWeight: 'bold', },
    cardSubtitle: { color: colors.primaryLight, marginTop: -5, fontSize: 14, },
    subCard: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.primaryLighter, },
    tableWrapper: { borderTopWidth: 1, borderColor: colors.rowBorder, },
    table: { width: '100%', backgroundColor: colors.white, },
    tableHeader: { backgroundColor: colors.headerBg, height: 48, },
    columnHeader: { flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 8, },
    columnHeader2: { flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 8, },
    headerText: { color: colors.primary, fontWeight: 'bold', textAlign: 'left', fontSize: 14, },
    tableRow: { borderBottomWidth: 1, borderBottomColor: colors.rowBorder, height: 50, },
    tableCell: { flex: 1, alignItems: 'center', paddingLeft: 8, height: 50, },
    tableCell2: { flex: 3, alignItems: 'center', paddingLeft: 8, height: 50, },
    cellText: { textAlign: 'left', color: '#333', fontSize: 14, },
    selectedRow: { backgroundColor: colors.primaryBackground, },
    tableButton: { height: 30, paddingVertical: 0, borderWidth: 1, borderColor: colors.primaryLight, borderRadius: 4, },
    tableButtonLabel: { fontSize: 12, marginVertical: 0, paddingVertical: 0, },
    pagination: { backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.rowBorder, paddingVertical: 8, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', },
    modal: { backgroundColor: colors.modalBg, padding: 24, margin: 20, borderRadius: 8, borderWidth: 1, borderColor: colors.primaryLighter, },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: colors.primary, },
    modalText: { fontSize: 14, marginBottom: 8, color: '#333', },
    modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 24, gap: 12, },
    modalButton: { borderColor: colors.primaryLight, },
    noteCard: { marginTop: 8, marginBottom: 16, borderWidth: 1, borderColor: colors.cardBorder, backgroundColor: colors.white, },
    noteTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: colors.primary, },
    noteInput: { marginBottom: 16, backgroundColor: colors.white, },
    saveButton: { alignSelf: 'flex-end', },
    avatarContainer: { flexDirection: 'row', alignItems: 'center', height: 50, width: '100%', },
    avatar: { marginRight: 8, borderRadius: 20, },
    filterContainer: { flexDirection: 'row', marginBottom: 10, position: 'relative' },
    searchInput: { flex: 1, backgroundColor: colors.white, height: 40, paddingLeft: 25, },
    inputIcon: { position: 'absolute', top: 10, left: 10, zIndex: 1001 },
    resultCount: { marginRight: 14, color: colors.primaryLight, },
    emptyRow: { height: 100, borderBottomWidth: 1, borderBottomColor: colors.rowBorder, },
    emptyMessage: { textAlign: 'center', color: '#888', fontSize: 16, },
});

export default ProjectTable;