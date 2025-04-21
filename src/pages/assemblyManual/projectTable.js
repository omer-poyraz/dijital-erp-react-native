import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Alert } from 'react-native';
import { DataTable, Text, Card, Button, TextInput, Portal, Modal, Avatar } from 'react-native-paper';
import { colors } from '../../utilities/colors';
import { pickDocument } from '../../utilities/pickDocument';
import { useTranslation } from 'react-i18next';
import StatusTag from './statusTag';
import ProgressBar from '../../components/chart/progressBar';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssemblyManualGetAll } from '../../redux/slices/assemblyManualGetAllSlice';
import { fetchAssemblySuccessGetAllByManual } from '../../redux/slices/assemblySuccessGetAllByManualSlice';
import { fetchAssemblyFailureGetAllByManual } from '../../redux/slices/assemblyFailureGetAllByManualSlice';
import { fetchAssemblyNoteCreate } from '../../redux/slices/assemblyNoteCreateSlice';
import { fetchAssemblyManualAddFile } from '../../redux/slices/assemblyManualAddFileSlice';

const ProjectTable = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { data: manuals, status: manualsStatus } = useSelector(state => state.assemblyManualGetAll);
    const { data: successStates, status: successStatus } = useSelector(state => state.assemblySuccessGetAllByManual);
    const { data: failureStates, status: failureStatus } = useSelector(state => state.assemblyFailureGetAllByManual);
    const { status: addNoteStatus } = useSelector(state => state.assemblyNoteCreate);
    const { status: addFileStatus } = useSelector(state => state.assemblyManualAddFile);

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
    const [filteredData, setFilteredData] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const isTablet = Dimensions.get('window').width > 600;
    const today = new Date();

    useEffect(() => {
        dispatch(fetchAssemblyManualGetAll());
    }, [dispatch]);

    useEffect(() => {
        if (manuals) {
            applyFilters();
        }
    }, [manuals, searchText]);

    const parseDate = (dateStr) => {
        const parts = dateStr.split('.');
        return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    };

    const daysDifference = (date1, date2) => {
        const diffTime = date2.getTime() - date1.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const calculateProgress = (project) => {
        const startDate = parseDate(project.date);
        const totalDays = project.time;

        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + totalDays);

        const remainingDays = daysDifference(today, endDate);
        const elapsedDays = daysDifference(startDate, today);
        const progress = Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100));

        return { progress, remainingDays, totalDays };
    };

    const applyFilters = () => {
        if (!manuals) return;

        let result = [...manuals];

        if (searchText) {
            const searchLower = searchText.toLowerCase();
            result = result.filter(item =>
                (item.responible || '').toLowerCase().includes(searchLower) ||
                (item.projectName || '').toLowerCase().includes(searchLower) ||
                (item.partCode || '').toLowerCase().includes(searchLower) ||
                (item.personInCharge || '').toLowerCase().includes(searchLower) ||
                (item.description || '').toLowerCase().includes(searchLower)
            );
        }

        setFilteredData(result);
        setPage1(0);
    };

    const handleRowPress = (item) => {
        setSelectedProject(item);

        dispatch(fetchAssemblySuccessGetAllByManual({ id: item.id }));
        dispatch(fetchAssemblyFailureGetAllByManual({ id: item.id }));

        setPage2(0);
        setPage3(0);
    };

    useEffect(() => {
        if (selectedProject && successStatus === 'succeeded') {
            setShowSuccessTable(successStates && successStates.length > 0);
        }
    }, [selectedProject, successStatus, successStates]);

    useEffect(() => {
        if (selectedProject && failureStatus === 'succeeded') {
            setShowFailureTable(failureStates && failureStates.length > 0);
        }
    }, [selectedProject, failureStatus, failureStates]);

    const handleFileUpload = (item) => {
        setSelectedRow(item);
        setFileModalVisible(true);
    };

    const uploadFile = () => {
        if (!selectedFile || !selectedRow) {
            Alert.alert(t('error'), t('please_select_file'));
            return;
        }

        dispatch(fetchAssemblyManualAddFile({
            formData: { file: [selectedFile] },
            id: selectedRow.id
        })).then(() => {
            setFileModalVisible(false);
            setSelectedFile(null);
            Alert.alert(t('success'), t('file_uploaded'));
            dispatch(fetchAssemblyManualGetAll());
        });
    };

    const handleSaveNote = (item) => {
        if (!noteText.trim()) {
            Alert.alert(t('error'), t('note_required'));
            return;
        }

        dispatch(fetchAssemblyNoteCreate({
            formData: {
                note: noteText,
                description: noteText,
                status: true
            },
            manualId: item.id
        })).then(() => {
            if (addNoteStatus === 'succeeded') {
                Alert.alert(t('success'), `${item.id} ${t("id_note_added")}: ${noteText}`);
                setNoteText('');
            }
        });
    };

    const selectFile = async () => {
        const file = await pickDocument();
        if (file) {
            setSelectedFile(file);
        }
    };

    const from1 = page1 * itemsPerPage;
    const to1 = Math.min((page1 + 1) * itemsPerPage, filteredData.length);

    const from2 = selectedProject ? (page2 * itemsPerPage) : 0;
    const to2 = selectedProject && successStates ? Math.min((page2 + 1) * itemsPerPage, successStates.length) : 0;

    const from3 = selectedProject ? (page3 * itemsPerPage) : 0;
    const to3 = selectedProject && failureStates ? Math.min((page3 + 1) * itemsPerPage, failureStates.length) : 0;

    if (manualsStatus === 'loading' && !manuals) {
        return (
            <View style={styles.page}>
                <Text style={styles.loadingText}>{t('loading')}...</Text>
            </View>
        );
    }

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
                                <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader2}>
                                    {t("project_responsible")}
                                </DataTable.Title>
                                <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>
                                    {t("project_name")}
                                </DataTable.Title>
                                <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>
                                    {t("dgt_code")}
                                </DataTable.Title>
                                <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader2}>
                                    {t("person_in_charge")}
                                </DataTable.Title>
                                <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>
                                    {t("serial_no")}
                                </DataTable.Title>
                                <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>
                                    {t("production_qty")}
                                </DataTable.Title>
                                <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>
                                    {t("duration")}
                                </DataTable.Title>
                                <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>
                                    {t("date")}
                                </DataTable.Title>
                                <DataTable.Title textStyle={styles.headerText} style={[styles.columnHeader, { flex: 1.5 }]}>
                                    {t("remaining_time")}
                                </DataTable.Title>
                                <DataTable.Title textStyle={styles.headerText} style={[styles.columnHeader, { flex: 1.5 }]}>
                                    {t("upload_file")}
                                </DataTable.Title>
                                <DataTable.Title textStyle={styles.headerText} style={[styles.columnHeader, { flex: 3.5 }]}>
                                    {t("description")}
                                </DataTable.Title>
                                <DataTable.Title textStyle={styles.headerText} style={[styles.columnHeader, { flex: 1.5 }]}>
                                    {t("date_time")}
                                </DataTable.Title>
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
                                                <Text style={styles.cellText}>{item.responible}</Text>
                                            </View>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}>
                                            <Text style={styles.cellText}>{item.projectName}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}>
                                            <Text style={styles.cellText}>{item.partCode}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell2}>
                                            <View style={styles.avatarContainer}>
                                                <Avatar.Image
                                                    size={40}
                                                    style={styles.avatar}
                                                    source={{ uri: `https://i.pravatar.cc/150?u=${item.id + 100}` }}
                                                />
                                                <Text style={styles.cellText}>{item.personInCharge}</Text>
                                            </View>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}>
                                            <Text style={styles.cellText}>{item.serialNumber}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}>
                                            <Text style={styles.cellText}>{item.productionQuantity}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}>
                                            <Text style={styles.cellText}>{item.time}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}>
                                            <Text style={styles.cellText}>{item.date}</Text>
                                        </DataTable.Cell>
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
                                                {t("upload")}
                                            </Button>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={[styles.tableCell, { flex: 3.5 }]}>
                                            <Text style={styles.cellText}>{item.description}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={[styles.tableCell, { flex: 1.5 }]}>
                                            <Text style={styles.cellText}>{item.technicianDate}</Text>
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

            {showSuccessTable && selectedProject && successStates && (
                <Card style={[styles.card, styles.subCard]}>
                    <Card.Title
                        title={t("successful_states_list")}
                        subtitle={`${selectedProject.projectName} - ${selectedProject.responible}`}
                        titleStyle={styles.cardTitle}
                        subtitleStyle={styles.cardSubtitle}
                    />
                    <View style={styles.tableWrapper}>
                        <ScrollView horizontal={!isTablet}>
                            <DataTable style={styles.table}>
                                <DataTable.Header style={styles.tableHeader}>
                                    <DataTable.Title textStyle={styles.headerText} style={[styles.columnHeader, { flex: 1.5 }]}>
                                        {t("description_list")}
                                    </DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>
                                        {t("technician_name")}
                                    </DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>
                                        {t("dgt_part_code")}
                                    </DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>
                                        {t("status")}
                                    </DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>
                                        {t("approval")}
                                    </DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>
                                        {t("pending_qty")}
                                    </DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={[styles.columnHeader, { flex: 1.5 }]}>
                                        {t("description")}
                                    </DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>
                                        {t("date")}
                                    </DataTable.Title>
                                </DataTable.Header>

                                {successStates.slice(from2, to2).map((item) => (
                                    <DataTable.Row key={item.id} style={styles.tableRow}>
                                        <DataTable.Cell style={[styles.tableCell, { flex: 1.5 }]}>
                                            <Text style={styles.cellText}>{item.description}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}>
                                            <Text style={styles.cellText}>{item.technician}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}>
                                            <Text style={styles.cellText}>{item.partCode}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}>
                                            <StatusTag durum={item.status ? 'Aktif' : 'Kapalı'} />
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}>
                                            <Text style={styles.cellText}>{item.approval}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}>
                                            <Text style={styles.cellText}>{item.pendingQuantity}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={[styles.tableCell, { flex: 1.5 }]}>
                                            <Text style={styles.cellText}>{item.qualityDescription}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}>
                                            <Text style={styles.cellText}>{item.date}</Text>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                            </DataTable>
                        </ScrollView>
                    </View>

                    {successStates.length > 0 && (
                        <DataTable.Pagination
                            page={page2}
                            numberOfPages={Math.ceil(successStates.length / itemsPerPage)}
                            onPageChange={(page) => setPage2(page)}
                            label={`${from2 + 1}-${to2} / ${successStates.length}`}
                            showFastPaginationControls
                            numberOfItemsPerPage={itemsPerPage}
                            style={styles.pagination}
                        />
                    )}
                </Card>
            )}

            {showFailureTable && selectedProject && failureStates && (
                <Card style={[styles.card, styles.subCard]}>
                    <Card.Title
                        title={t("inappropriateness_detection_list")}
                        subtitle={`${selectedProject.projectName} - ${selectedProject.responible}`}
                        titleStyle={styles.cardTitle}
                        subtitleStyle={styles.cardSubtitle}
                    />
                    <View style={styles.tableWrapper}>
                        <ScrollView horizontal={!isTablet}>
                            <DataTable style={styles.table}>
                                <DataTable.Header style={styles.tableHeader}>
                                    <DataTable.Title textStyle={styles.headerText} style={[styles.columnHeader, { flex: 1.5 }]}>
                                        {t("inappropriateness_detection")}
                                    </DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>
                                        {t("technician_name")}
                                    </DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>
                                        {t("dgt_part_code")}
                                    </DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>
                                        {t("status")}
                                    </DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>
                                        {t("pending_qty")}
                                    </DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={[styles.columnHeader, { flex: 1.5 }]}>
                                        {t("description")}
                                    </DataTable.Title>
                                    <DataTable.Title textStyle={styles.headerText} style={styles.columnHeader}>
                                        {t("date")}
                                    </DataTable.Title>
                                </DataTable.Header>

                                {failureStates.slice(from3, to3).map((item) => (
                                    <DataTable.Row key={item.id} style={styles.tableRow}>
                                        <DataTable.Cell style={[styles.tableCell, { flex: 1.5 }]}>
                                            <Text style={styles.cellText}>{item.inappropriateness}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}>
                                            <Text style={styles.cellText}>{item.technician}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}>
                                            <Text style={styles.cellText}>{item.partCode}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}>
                                            <StatusTag durum={item.status ? 'Aktif' : 'Kapalı'} />
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}>
                                            <Text style={styles.cellText}>{item.pendingQuantity}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={[styles.tableCell, { flex: 1.5 }]}>
                                            <Text style={styles.cellText}>{item.qualityDescription}</Text>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}>
                                            <Text style={styles.cellText}>{item.date}</Text>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                            </DataTable>
                        </ScrollView>
                    </View>

                    {failureStates.length > 0 && (
                        <DataTable.Pagination
                            page={page3}
                            numberOfPages={Math.ceil(failureStates.length / itemsPerPage)}
                            onPageChange={(page) => setPage3(page)}
                            label={`${from3 + 1}-${to3} / ${failureStates.length}`}
                            showFastPaginationControls
                            numberOfItemsPerPage={itemsPerPage}
                            style={styles.pagination}
                        />
                    )}
                </Card>
            )}

            <Portal>
                <Modal visible={fileModalVisible} onDismiss={() => setFileModalVisible(false)} contentContainerStyle={styles.modal}>
                    <Text style={styles.modalTitle}>{t("file_upload")}</Text>
                    <Text style={styles.modalText}>{t("project")}: {selectedRow?.projectName}</Text>
                    <Text style={styles.modalText}>{t("part_code")}: {selectedRow?.partCode}</Text>
                    <View style={styles.modalButtons}>
                        <Button
                            mode="outlined"
                            onPress={() => setFileModalVisible(false)}
                            style={styles.modalButton}
                            textColor={colors.primary}
                        >
                            {t("cancel")}
                        </Button>
                        <Button
                            mode="contained"
                            onPress={selectFile}
                            style={styles.modalButton}
                            buttonColor={colors.primary}
                            loading={addFileStatus === 'loading'}
                            disabled={addFileStatus === 'loading'}
                        >
                            {selectedFile ? t("change_file") : t("select_file")}
                        </Button>
                        <Button
                            mode="contained"
                            onPress={uploadFile}
                            style={[styles.modalButton, { marginLeft: 10 }]}
                            buttonColor={selectedFile ? colors.primary : colors.primaryLight}
                            disabled={!selectedFile || addFileStatus === 'loading'}
                            loading={addFileStatus === 'loading'}
                        >
                            {t("upload_file")}
                        </Button>
                    </View>
                </Modal>
            </Portal>

            {selectedProject && (
                <Card style={styles.noteCard}>
                    <Card.Content>
                        <Text style={styles.noteTitle}>{t("add_note")} ({selectedProject.projectName})</Text>
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
                            loading={addNoteStatus === 'loading'}
                            disabled={addNoteStatus === 'loading' || !noteText.trim()}
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
    loadingText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: colors.primary },
});

export default ProjectTable;