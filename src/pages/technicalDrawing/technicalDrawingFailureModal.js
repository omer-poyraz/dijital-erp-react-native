import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Modal, FlatList, Alert } from 'react-native'
import { colors } from '../../utilities/colors'
import { Card, Divider, List, TextInput, Button } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import StatusTag from './statusTag'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTechnicalDrawingFailureGet } from '../../redux/slices/technicalDrawingFailureGetSlice'
import { useNavigation } from '@react-navigation/native'
import { fetchTechnicalDrawingQualityGetAllByFailure } from '../../redux/slices/technicalDrawingQualityGetAllByFailureSlice'
import { fetchTechnicalDrawingQualityCreate } from '../../redux/slices/technicalDrawingQualityCreateSlice'
import { fetchTechnicalDrawingQualityDelete } from '../../redux/slices/technicalDrawingQualityDeleteSlice'

const TechnicalDrawingFailureDetailPage = ({ route }) => {
    const { id } = route.params;
    const { t } = useTranslation();
    const data = useSelector(state => state.technicalDrawingFailureGet.data);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [qualityModal, setQualityModal] = useState(false);
    const [desc, setDesc] = useState('');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);
    const qualityList = useSelector(state => state.technicalDrawingQualityGetAllByFailure.data);
    const qualityStatus = useSelector(state => state.technicalDrawingQualityGetAllByFailure.status);

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR');
    };

    const getQualityList = async () => {
        await dispatch(fetchTechnicalDrawingQualityGetAllByFailure({ id }));
    };

    useEffect(() => {
        if (qualityModal) getQualityList();
    }, [qualityModal]);

    const getData = async () => {
        await dispatch(fetchTechnicalDrawingFailureGet({ id: id }));
    }

    useEffect(() => { getData() }, [dispatch])

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: `${data?.inappropriateness || data?.partCode}`,
            headerRight: () => {
                return (
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={() => setQualityModal(true)} style={styles.closeBtn}>
                            <Ionicons name='glasses-outline' size={28} style={styles.close} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
                            <Ionicons name='chevron-back-outline' size={28} style={styles.close} />
                        </TouchableOpacity>
                    </View>
                )
            }
        })
    }, [id, data, navigation])

    const handleAddQuality = async () => {
        if (!desc.trim() && !note.trim()) {
            Alert.alert(t('error'), t('please_fill_fields'));
            return;
        }
        setLoading(true);
        await dispatch(fetchTechnicalDrawingQualityCreate({
            formData: {
                description: desc,
                note: note,
                technicalDrawingFailureStateID: id
            }
        }));
        setDesc('');
        setNote('');
        await getQualityList();
        setLoading(false);
    };

    const handleDeleteQuality = async (qualityId) => {
        Alert.alert(
            t('delete'),
            t('are_you_sure'),
            [
                { text: t('cancel'), style: 'cancel' },
                {
                    text: t('delete'),
                    style: 'destructive',
                    onPress: async () => {
                        setLoading(true);
                        await dispatch(fetchTechnicalDrawingQualityDelete({ id: qualityId }));
                        await getQualityList();
                        setLoading(false);
                    }
                }
            ]
        );
    };

    const renderQualityItem = ({ item }) => (
        <Card style={styles.qualityCard} elevation={2}>
            <Card.Content>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.qualityDesc}>{item.description}</Text>
                        <Text style={styles.qualityNote}>{item.note}</Text>
                        <Text style={styles.qualityDate}>{item.createdAt}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleDeleteQuality(item.id)} style={styles.deleteBtn}>
                        <Ionicons name="trash-outline" size={22} color={colors.error} />
                    </TouchableOpacity>
                </View>
            </Card.Content>
        </Card>
    );

    return (
        <View style={styles.page}>
            <View style={styles.modal}>
                <View style={styles.modalHeader}>
                    <View style={styles.headerContent}>
                        <Text style={styles.modalTitle}>
                            {t('failure_detail')}
                        </Text>
                    </View>
                </View>

                <View style={styles.modalContent}>
                    <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
                        <Card style={styles.card} elevation={2}>
                            <Card.Content>
                                <View style={styles.alertBox}>
                                    <Ionicons name="alert-circle" size={24} color="#000" style={styles.alertIcon} />
                                    <Text style={styles.alertText}>{data?.inappropriateness || data?.partCode}</Text>
                                </View>

                                <View style={styles.headerStatusContainer}>
                                    <StatusTag durum={data?.status ? 'Aktif' : 'Kapalı'} />
                                    <Text style={styles.dateText}>{formatDate(data?.createdAt)}</Text>
                                </View>

                                <Divider style={styles.divider} />

                                <List.Section>
                                    <List.Item
                                        title={t('operator')}
                                        description={
                                            data?.operator
                                                ? `${data.operator.firstName || ''} ${data.operator.lastName || ''}`.trim()
                                                : data?.user
                                                    ? `${data.user.firstName || ''} ${data.user.lastName || ''}`.trim()
                                                    : '-'
                                        }
                                        left={() => <List.Icon icon="account" color={colors.primary} />}
                                        titleStyle={styles.listTitle}
                                        descriptionStyle={styles.listDescription}
                                    />

                                    <Divider style={styles.itemDivider} />

                                    <List.Item
                                        title={t('part_code')}
                                        description={data?.partCode || '-'}
                                        left={() => <List.Icon icon="barcode" color={colors.primary} />}
                                        titleStyle={styles.listTitle}
                                        descriptionStyle={styles.listDescription}
                                    />

                                    <Divider style={styles.itemDivider} />

                                    <List.Item
                                        title={t('pending_qty')}
                                        description={data?.productionQuantity || '0'}
                                        left={() => <List.Icon icon="cube" color={colors.primary} />}
                                        titleStyle={styles.listTitle}
                                        descriptionStyle={styles.listDescription}
                                    />
                                </List.Section>

                                <Divider style={styles.divider} />

                                <Text style={styles.sectionTitle}>{t('quality_description')}</Text>
                                <View style={styles.descriptionBox}>
                                    <Text style={styles.description}>
                                        {data?.quantityDescription || t('no_description')}
                                    </Text>
                                </View>

                                {data?.user && (
                                    <>
                                        <Divider style={styles.divider} />
                                        <View style={styles.userSection}>
                                            <View style={styles.userAvatarContainer}>
                                                <Text style={styles.avatarText}>
                                                    {data?.user?.firstName?.[0]}{data?.user?.lastName?.[0]}
                                                </Text>
                                            </View>
                                            <View style={styles.userInfo}>
                                                <Text style={styles.userName}>{data?.user?.firstName} {data?.user?.lastName}</Text>
                                                <Text style={styles.userTitle}>{data?.user?.title || '-'}</Text>
                                            </View>
                                        </View>
                                    </>
                                )}
                            </Card.Content>
                        </Card>

                        <Card style={[styles.card, styles.timelineCard]} elevation={2}>
                            <Card.Content>
                                <Text style={styles.sectionTitle}>{t('issue_timeline')}</Text>
                                <View style={styles.timeline}>
                                    <View style={styles.timelineItem}>
                                        <View style={styles.timelineIconContainer}>
                                            <Ionicons name="alert-circle" size={16} color="#000" />
                                        </View>
                                        <View style={styles.timelineContent}>
                                            <Text style={styles.timelineTitle}>{t('issue_reported')}</Text>
                                            <Text style={styles.timelineTime}>{formatDate(data?.createdAt)}</Text>
                                            <Text style={styles.timelineText}>
                                                {t('issue_reported_by')} {data?.user?.firstName} {data?.user?.lastName}
                                            </Text>
                                        </View>
                                    </View>

                                    {data?.status ? (
                                        <View style={styles.timelineItem}>
                                            <View style={[styles.timelineIconContainer, styles.pendingIcon]}>
                                                <Ionicons name="time" size={16} color="#000" />
                                            </View>
                                            <View style={styles.timelineContent}>
                                                <Text style={styles.timelineTitle}>{t('in_progress')}</Text>
                                                <Text style={styles.timelineText}>
                                                    {t('issue_being_addressed')}
                                                </Text>
                                            </View>
                                        </View>
                                    ) : (
                                        <View style={styles.timelineItem}>
                                            <View style={[styles.timelineIconContainer, styles.resolvedIcon]}>
                                                <Ionicons name="checkmark" size={16} color="#000" />
                                            </View>
                                            <View style={styles.timelineContent}>
                                                <Text style={styles.timelineTitle}>{t('issue_resolved')}</Text>
                                                <Text style={styles.timelineTime}>{formatDate(data?.updatedAt)}</Text>
                                                <Text style={styles.timelineText}>
                                                    {t('issue_has_been_resolved')}
                                                </Text>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </Card.Content>
                        </Card>
                    </ScrollView>
                </View>
            </View>

            <Modal
                visible={qualityModal}
                animationType="slide"
                transparent
                onRequestClose={() => setQualityModal(false)}
            >
                <View style={styles.qualityModalOverlay}>
                    <View style={styles.qualityModal}>
                        <View style={styles.qualityModalHeader}>
                            <Text style={styles.qualityModalTitle}>{t('quality_explanations')}</Text>
                            <TouchableOpacity onPress={() => setQualityModal(false)}>
                                <Ionicons name="close" size={28} color={colors.primary} />
                            </TouchableOpacity>
                        </View>
                        <Divider style={{ marginBottom: 8 }} />
                        <FlatList
                            data={qualityList || []}
                            renderItem={renderQualityItem}
                            keyExtractor={item => item.id?.toString()}
                            ListEmptyComponent={
                                <View style={{ alignItems: 'center', marginVertical: 24 }}>
                                    <Ionicons name="information-circle-outline" size={48} color="#ccc" />
                                    <Text style={{ color: '#888', marginTop: 8 }}>{t('no_quality_explanation')}</Text>
                                </View>
                            }
                            style={{ flexGrow: 0, maxHeight: 220 }}
                        />
                        <Divider style={{ marginVertical: 8 }} />
                        <TextInput
                            label={t('quality_description')}
                            value={desc}
                            onChangeText={setDesc}
                            mode="outlined"
                            style={{ marginBottom: 8 }}
                            multiline
                        />
                        <TextInput
                            label={t('quality_note')}
                            value={note}
                            onChangeText={setNote}
                            mode="outlined"
                            style={{ marginBottom: 8 }}
                            multiline
                        />
                        <Button
                            mode="contained"
                            onPress={handleAddQuality}
                            loading={loading}
                            disabled={loading}
                            style={{ marginTop: 8, borderRadius: 8 }}
                            buttonColor={colors.primary}
                        >
                            {t('add')}
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    page: { backgroundColor: '#f5f5f5', flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center', },
    modal: { width: '100%', height: '95%', backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.error, paddingVertical: 12, paddingHorizontal: 16, },
    headerContent: { flex: 1, flexDirection: 'row', alignItems: 'center', },
    modalTitle: { color: '#000', fontSize: 18, fontWeight: 'bold', flex: 1, },
    statusBadge: { backgroundColor: 'rgba(255,255,255,0.3)', color: '#000', },
    closeBtn: { marginRight: 30, marginTop: 10 },
    close: { color: '#fff', },
    modalContent: { flex: 1, backgroundColor: '#f9f9f9', },
    contentScroll: { flex: 1, padding: 12, },
    card: { borderRadius: 8, marginBottom: 12, },
    alertBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.error, borderRadius: 6, padding: 12, marginBottom: 12, },
    alertIcon: { marginRight: 10, },
    alertText: { color: '#000', fontSize: 16, fontWeight: 'bold', flex: 1, },
    headerStatusContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    dateText: { fontSize: 12, color: '#888', },
    divider: { height: 1, backgroundColor: '#e0e0e0', marginVertical: 16, },
    headerRight: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' },
    itemDivider: { height: 1, backgroundColor: '#f0f0f0', },
    listTitle: { fontSize: 12, color: '#888', },
    listDescription: { fontSize: 16, color: '#333', },
    sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.primary, marginBottom: 10, },
    descriptionBox: { backgroundColor: '#f5f5f5', borderRadius: 6, padding: 12, borderLeftWidth: 4, borderLeftColor: colors.warning, },
    description: { fontSize: 14, lineHeight: 22, color: '#444', },
    userSection: { flexDirection: 'row', alignItems: 'center', },
    userAvatarContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: 12, },
    avatarText: { color: '#fff', fontSize: 18, fontWeight: 'bold', },
    userInfo: { flex: 1, },
    userName: { fontSize: 16, fontWeight: '600', },
    userTitle: { fontSize: 14, color: '#666', marginTop: 2, },
    timelineCard: { marginTop: 4, },
    timeline: { marginTop: 8, },
    timelineItem: { flexDirection: 'row', marginBottom: 20, },
    timelineIconContainer: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.error, justifyContent: 'center', alignItems: 'center', marginRight: 12, },
    pendingIcon: { backgroundColor: colors.warning, },
    resolvedIcon: { backgroundColor: colors.success, },
    timelineContent: { flex: 1, borderLeftWidth: 1, borderLeftColor: '#e0e0e0', paddingLeft: 12, paddingBottom: 20, },
    timelineTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4, },
    timelineTime: { fontSize: 12, color: '#888', marginBottom: 4, },
    timelineText: { fontSize: 14, color: '#555', },
    buttonsContainer: { flexDirection: 'row', marginTop: 8, marginBottom: 20, justifyContent: 'space-between', },
    actionButton: { flex: 1, marginHorizontal: 4, },
    qualityModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
    qualityModal: { width: '90%', maxWidth: 500, backgroundColor: '#fff', borderRadius: 14, padding: 18, elevation: 8 },
    qualityModalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    qualityModalTitle: { fontSize: 18, fontWeight: 'bold', color: colors.primary },
    qualityCard: { marginBottom: 10, borderRadius: 8, backgroundColor: '#f8f8f8' },
    qualityDesc: { fontSize: 15, fontWeight: 'bold', color: colors.primaryDark },
    qualityNote: { fontSize: 14, color: '#444', marginTop: 2 },
    qualityDate: { fontSize: 12, color: '#888', marginTop: 2 },
    deleteBtn: { padding: 8 },
});

export default TechnicalDrawingFailureDetailPage;