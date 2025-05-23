import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCMMNoteGetAllByManual } from '../../redux/slices/cmmNoteGetAllByManualSlice'
import { Ionicons } from '@expo/vector-icons'
import { Card, Divider, TextInput, Badge, Avatar, Chip, Button, Switch } from 'react-native-paper'
import { colors } from '../../utilities/colors'
import { useTranslation } from 'react-i18next'
import { fetchCMMNoteCreate } from '../../redux/slices/cmmNoteCreateSlice'

const CMMNoteModal = ({ item, modal, setModal }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { data: notes, status } = useSelector(state => state.cmmNoteGetAllByManual);
    const [refreshing, setRefreshing] = useState(false);
    const [noteText, setNoteText] = useState('');
    const [formData, setFormData] = useState({ note: "", description: "", status: true });
    const [tab, setTab] = useState(true);

    const getData = async () => {
        if (item?.id) {
            await dispatch(fetchCMMNoteGetAllByManual({ id: item.id }));
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await getData();
        setRefreshing(false);
    };

    useEffect(() => {
        if (modal && item?.id) {
            getData();
        }
    }, [dispatch, modal, item?.id]);

    const handleSaveNote = async () => {
        await dispatch(fetchCMMNoteCreate({ formData: formData, manualId: item.id }));
        setFormData({ partCode: "", description: "", status: true, })
        getData();
        setTab(true);
        setNoteText('');
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getInitials = (user) => {
        if (!user) return '??';
        return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`;
    };

    const renderNoteItem = ({ item: note }) => (
        <Card style={styles.noteCard} elevation={2}>
            <Card.Content>
                <View style={styles.noteHeader}>
                    <View style={styles.noteHeaderLeft}>
                        <Avatar.Text
                            size={40}
                            label={getInitials(note.user)}
                            style={styles.avatar}
                            labelStyle={styles.avatarLabel}
                        />
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{note.user?.firstName} {note.user?.lastName}</Text>
                            <Text style={styles.userTitle} numberOfLines={1}>{note.user?.title || '-'}</Text>
                        </View>
                    </View>
                    <Badge style={styles.statusBadge}>
                        {formatDate(note.createdAt)}
                    </Badge>
                </View>

                <Divider style={styles.divider} />

                <View style={styles.noteContent}>
                    <View style={styles.noteTitleContainer}>
                        <Ionicons name="document-text-outline" size={20} color={colors.primary} style={styles.noteIcon} />
                        <Text style={styles.noteTitle}>{note.partCode}</Text>
                    </View>

                    {note.description ? (
                        <Text style={styles.noteDescription}>{note.description}</Text>
                    ) : null}
                </View>

                <View style={styles.tagsContainer}>
                    <Chip
                        icon={note.status ? "check-circle" : "alert-circle"}
                        mode="outlined"
                        style={[
                            styles.statusChip,
                            note.status ? styles.activeStatus : styles.inactiveStatus
                        ]}
                    >
                        {note.status ? t('active') : t('inactive')}
                    </Chip>
                </View>
            </Card.Content>
        </Card>
    );

    const renderEmptyList = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="document-text" size={64} color="#ccc" />
            <Text style={styles.emptyText}>{t('no_notes')}</Text>
        </View>
    );

    return (
        <View style={[styles.page, modal ? { display: 'flex' } : { display: 'none' }]}>
            <View style={styles.modal}>
                <View style={styles.modalHeader}>
                    <View style={styles.headerContent}>
                        <Text style={styles.modalTitle}>
                            {t('project_notes')}
                            <Text style={styles.serialText}> ({item?.serialNumber})</Text>
                        </Text>
                        <Text style={styles.projectName}>{item?.projectName}</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={() => setTab(!tab)} style={styles.closeBtn}>
                            <Ionicons name={tab ? 'add-outline' : 'list-outline'} size={28} style={styles.close} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModal(false)} style={styles.closeBtn}>
                            <Ionicons name='close' size={28} style={styles.close} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.modalContent}>
                    {tab ? <>
                        {status === 'loading' && !refreshing ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color={colors.primary} />
                                <Text style={styles.loadingText}>{t('loading_notes')}</Text>
                            </View>
                        ) : (
                            <FlatList
                                data={notes}
                                renderItem={renderNoteItem}
                                keyExtractor={item => item.id.toString()}
                                contentContainerStyle={styles.notesList}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={renderEmptyList}
                                onRefresh={onRefresh}
                                refreshing={refreshing}
                            />
                        )}
                    </> : <>
                        <Card style={styles.noteCard}>
                            <Card.Content>
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
                                    <Text style={{ marginRight: 8 }}>{t('approval')}</Text>
                                    <Switch
                                        value={formData.status}
                                        onValueChange={val => setFormData(prev => ({ ...prev, status: val }))}
                                        color={colors.primary}
                                    />
                                </View>
                                <Button
                                    mode="contained"
                                    onPress={() => handleSaveNote()}
                                    style={styles.saveButton}
                                    buttonColor={colors.primary}
                                >
                                    {t("save_note")}
                                </Button>
                            </Card.Content>
                        </Card>
                    </>}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    page: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', zIndex: 1000, },
    modal: { width: '90%', maxWidth: 700, height: '90%', backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.primary, paddingVertical: 12, paddingHorizontal: 16, },
    headerContent: { flex: 1, },
    modalTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', },
    serialText: { fontSize: 16, fontWeight: 'normal', },
    projectName: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 4, },
    headerRight: { flexDirection: 'row', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' },
    closeBtn: { padding: 4, },
    close: { color: '#fff', },
    modalContent: { flex: 1, backgroundColor: '#f5f5f5', },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', },
    loadingText: { marginTop: 12, fontSize: 16, color: colors.primary, },
    notesList: { padding: 12, paddingBottom: 20, },
    noteCard: { marginBottom: 12, margin: 20, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: colors.primary, },
    noteInput: { marginBottom: 16, backgroundColor: colors.white, },
    noteHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
    noteHeaderLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, },
    avatar: { backgroundColor: colors.primary, },
    avatarLabel: { fontSize: 14, fontWeight: 'bold', },
    userInfo: { marginLeft: 12, flex: 1, },
    userName: { fontSize: 14, fontWeight: '600', color: '#333', },
    userTitle: { fontSize: 12, color: '#666', marginTop: 2, },
    statusBadge: { backgroundColor: '#f0f0f0', color: '#555', fontWeight: 'normal', },
    divider: { marginVertical: 12, },
    noteContent: { marginBottom: 12, },
    noteTitleContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, },
    noteIcon: { marginRight: 8, },
    noteTitle: { fontSize: 16, fontWeight: '600', color: '#333', flex: 1, },
    noteDescription: { fontSize: 14, color: '#555', lineHeight: 20, marginLeft: 28, },
    tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', },
    statusChip: { marginRight: 6, marginBottom: 4, },
    activeStatus: { borderColor: colors.success, },
    inactiveStatus: { borderColor: colors.warning, },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40, },
    emptyText: { marginTop: 16, fontSize: 16, color: '#888', textAlign: 'center', },
});

export default CMMNoteModal;