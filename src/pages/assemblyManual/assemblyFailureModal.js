import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { colors } from '../../utilities/colors'
import { Button, Card, Divider, Badge, List, Timeline } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import StatusTag from './statusTag'

const AssemblyFailureModal = ({ item, modal, setModal }) => {
    const { t } = useTranslation();

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR');
    };

    return (
        <View style={[styles.page, modal ? { display: 'flex' } : { display: 'none' }]}>
            <View style={styles.modal}>
                <View style={styles.modalHeader}>
                    <View style={styles.headerContent}>
                        <Text style={styles.modalTitle}>
                            {t('failure_detail')}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => setModal(false)} style={styles.closeBtn}>
                        <Ionicons name='close' size={28} style={styles.close} />
                    </TouchableOpacity>
                </View>

                <View style={styles.modalContent}>
                    <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
                        <Card style={styles.card} elevation={2}>
                            <Card.Content>
                                <View style={styles.alertBox}>
                                    <Ionicons name="alert-circle" size={24} color="#fff" style={styles.alertIcon} />
                                    <Text style={styles.alertText}>{item?.inappropriateness}</Text>
                                </View>

                                <View style={styles.headerStatusContainer}>
                                    <StatusTag durum={item?.status ? 'Aktif' : 'Kapalı'} />
                                    <Text style={styles.dateText}>{formatDate(item?.createdAt)}</Text>
                                </View>

                                <Divider style={styles.divider} />

                                <List.Section>
                                    <List.Item
                                        title={t('technician')}
                                        description={item?.technician || '-'}
                                        left={() => <List.Icon icon="account" color={colors.primary} />}
                                        titleStyle={styles.listTitle}
                                        descriptionStyle={styles.listDescription}
                                    />

                                    <Divider style={styles.itemDivider} />

                                    <List.Item
                                        title={t('part_code')}
                                        description={item?.partCode || '-'}
                                        left={() => <List.Icon icon="barcode" color={colors.primary} />}
                                        titleStyle={styles.listTitle}
                                        descriptionStyle={styles.listDescription}
                                    />

                                    <Divider style={styles.itemDivider} />

                                    <List.Item
                                        title={t('pending_qty')}
                                        description={item?.pendingQuantity || '0'}
                                        left={() => <List.Icon icon="cube" color={colors.primary} />}
                                        titleStyle={styles.listTitle}
                                        descriptionStyle={styles.listDescription}
                                    />
                                </List.Section>

                                <Divider style={styles.divider} />

                                <Text style={styles.sectionTitle}>{t('quality_description')}</Text>
                                <View style={styles.descriptionBox}>
                                    <Text style={styles.description}>
                                        {item?.qualityDescription || t('no_description')}
                                    </Text>
                                </View>

                                {item?.user && (
                                    <>
                                        <Divider style={styles.divider} />
                                        <View style={styles.userSection}>
                                            <View style={styles.userAvatarContainer}>
                                                <Text style={styles.avatarText}>
                                                    {item?.user?.firstName?.[0]}{item?.user?.lastName?.[0]}
                                                </Text>
                                            </View>
                                            <View style={styles.userInfo}>
                                                <Text style={styles.userName}>{item?.user?.firstName} {item?.user?.lastName}</Text>
                                                <Text style={styles.userTitle}>{item?.user?.title || '-'}</Text>
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
                                            <Ionicons name="alert-circle" size={16} color="#fff" />
                                        </View>
                                        <View style={styles.timelineContent}>
                                            <Text style={styles.timelineTitle}>{t('issue_reported')}</Text>
                                            <Text style={styles.timelineTime}>{formatDate(item?.createdAt)}</Text>
                                            <Text style={styles.timelineText}>
                                                {t('issue_reported_by')} {item?.user?.firstName} {item?.user?.lastName}
                                            </Text>
                                        </View>
                                    </View>

                                    {item?.status ? (
                                        <View style={styles.timelineItem}>
                                            <View style={[styles.timelineIconContainer, styles.pendingIcon]}>
                                                <Ionicons name="time" size={16} color="#fff" />
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
                                                <Ionicons name="checkmark" size={16} color="#fff" />
                                            </View>
                                            <View style={styles.timelineContent}>
                                                <Text style={styles.timelineTitle}>{t('issue_resolved')}</Text>
                                                <Text style={styles.timelineTime}>{formatDate(item?.updatedAt)}</Text>
                                                <Text style={styles.timelineText}>
                                                    {t('issue_has_been_resolved')}
                                                </Text>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </Card.Content>
                        </Card>

                        <View style={styles.buttonsContainer}>
                            <Button
                                mode="contained"
                                icon="file-document-edit"
                                style={[styles.actionButton, { backgroundColor: colors.primary }]}
                                onPress={() => { }}
                            >
                                {t('edit')}
                            </Button>

                            <Button
                                mode="outlined"
                                icon={item?.status ? "check-circle" : "refresh"}
                                style={styles.actionButton}
                                textColor={item?.status ? colors.success : colors.warning}
                                onPress={() => { }}
                            >
                                {item?.status ? t('mark_resolved') : t('reopen_issue')}
                            </Button>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    page: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', zIndex: 1000, },
    modal: { width: '90%', maxWidth: 600, height: '90%', backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.error, paddingVertical: 12, paddingHorizontal: 16, },
    headerContent: { flex: 1, flexDirection: 'row', alignItems: 'center', },
    modalTitle: { color: '#000', fontSize: 18, fontWeight: 'bold', flex: 1, },
    statusBadge: { backgroundColor: 'rgba(255,255,255,0.3)', color: '#000', },
    closeBtn: { padding: 4, },
    close: { color: '#000', },
    modalContent: { flex: 1, backgroundColor: '#f9f9f9', },
    contentScroll: { flex: 1, padding: 12, },
    card: { borderRadius: 8, marginBottom: 12, },
    alertBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.error, borderRadius: 6, padding: 12, marginBottom: 12, },
    alertIcon: { marginRight: 10, },
    alertText: { color: '#fff', fontSize: 16, fontWeight: 'bold', flex: 1, },
    headerStatusContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    dateText: { fontSize: 12, color: '#888', },
    divider: { height: 1, backgroundColor: '#e0e0e0', marginVertical: 16, },
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
});

export default AssemblyFailureModal;