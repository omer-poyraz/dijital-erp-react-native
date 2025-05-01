import { Ionicons } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { colors } from '../../utilities/colors'
import { Card, Divider, List } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import StatusTag from './statusTag'
import { fetchTechnicalDrawingSuccessGet } from '../../redux/slices/technicalDrawingSuccessGetSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const TechnicalDrawingSuccessDetailPage = ({ route }) => {
    const { id } = route.params
    const { t } = useTranslation();
    const data = useSelector(state => state.technicalDrawingSuccessGet.data);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR');
    };

    const getData = async () => {
        await dispatch(fetchTechnicalDrawingSuccessGet({ id: id }))
    }

    useEffect(() => { getData() }, [dispatch])

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: `${data?.partCode}`,
            headerRight: () => {
                return (
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
                            <Ionicons name='chevron-back-outline' size={28} style={styles.close} />
                        </TouchableOpacity>
                    </View>
                )
            }
        })
    }, [id, data, navigation])

    return (
        <View style={styles.page}>
            <View style={styles.modal}>
                <View style={styles.modalHeader}>
                    <View style={styles.headerContent}>
                        <Text style={styles.modalTitle}>
                            {t('success_detail')}
                        </Text>
                    </View>
                </View>

                <View style={styles.modalContent}>
                    <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
                        <Card style={styles.card} elevation={2}>
                            <Card.Content>
                                <View style={styles.headerRow}>
                                    <View style={styles.iconContainer}>
                                        <Ionicons name="checkmark-circle" size={36} color={colors.success} />
                                    </View>

                                    <View style={styles.headerText}>
                                        <Text style={styles.successTitle}>{data?.description}</Text>
                                        <View style={styles.statusContainer}>
                                            <StatusTag durum={data?.status ? 'Aktif' : 'Kapalı'} />
                                            <Text style={styles.dateText}>{formatDate(data?.createdAt)}</Text>
                                        </View>
                                    </View>
                                </View>

                                <Divider style={styles.divider} />

                                <List.Section>
                                    <List.Item
                                        title={t('operator')}
                                        description={
                                            data?.operator
                                                ? `${data.operator.name || ''} ${data.operator.surname || ''}`.trim()
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
                                        title={t('approval')}
                                        description={data?.approval || '-'}
                                        left={() => <List.Icon icon="check-decagram" color={colors.success} />}
                                        titleStyle={styles.listTitle}
                                        descriptionStyle={styles.listDescription}
                                    />

                                    <Divider style={styles.itemDivider} />

                                    <List.Item
                                        title={t('pending_qty')}
                                        description={data?.pendingQuantity || '0'}
                                        left={() => <List.Icon icon="cube" color={colors.primary} />}
                                        titleStyle={styles.listTitle}
                                        descriptionStyle={styles.listDescription}
                                    />
                                </List.Section>

                                <Divider style={styles.divider} />

                                <Text style={styles.sectionTitle}>{t('quality_description')}</Text>
                                <Text style={styles.description}>
                                    {data?.qualityDescription || t('no_description')}
                                </Text>

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
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    page: { backgroundColor: '#f5f5f5', flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center', },
    modal: { width: '100%', height: '95%', backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.success, paddingVertical: 12, paddingHorizontal: 16, },
    headerContent: { flex: 1, flexDirection: 'row', alignItems: 'center', },
    modalTitle: { color: '#000', fontSize: 18, fontWeight: 'bold', flex: 1, },
    statusBadge: { backgroundColor: 'rgba(255,255,255,0.3)', color: '#000', },
    closeBtn: { marginRight: 20, marginTop: 10 },
    close: { color: '#fff', },
    modalContent: { flex: 1, backgroundColor: '#f9f9f9', },
    contentScroll: { flex: 1, padding: 12, },
    card: { borderRadius: 8, },
    headerRow: { flexDirection: 'row', marginBottom: 16, },
    iconContainer: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(76, 175, 80, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 12, },
    headerText: { flex: 1, },
    successTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 6, },
    statusContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    dateText: { fontSize: 12, color: '#888', },
    divider: { height: 1, backgroundColor: '#e0e0e0', marginVertical: 16, },
    itemDivider: { height: 1, backgroundColor: '#f0f0f0', },
    listTitle: { fontSize: 12, color: '#888', },
    listDescription: { fontSize: 16, color: '#333', },
    sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.primary, marginBottom: 10, },
    description: { fontSize: 14, lineHeight: 22, color: '#444', },
    userSection: { flexDirection: 'row', alignItems: 'center', },
    userAvatarContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: 12, },
    avatarText: { color: '#fff', fontSize: 18, fontWeight: 'bold', },
    userInfo: { flex: 1, },
    userName: { fontSize: 16, fontWeight: '600', },
    userTitle: { fontSize: 14, color: '#666', marginTop: 2, },
    buttonsContainer: { flexDirection: 'row', marginTop: 16, marginBottom: 20, justifyContent: 'space-between', },
    actionButton: { flex: 1, marginHorizontal: 4, },
});

export default TechnicalDrawingSuccessDetailPage;