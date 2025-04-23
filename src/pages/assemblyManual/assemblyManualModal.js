import { Ionicons } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, FlatList } from 'react-native'
import { colors } from '../../utilities/colors'
import { Button, Card, Divider, Chip, ActivityIndicator } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { URL } from '../../api'
import Pdf from 'react-native-pdf'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'

const AssemblyManualModal = ({ item, modal, setModal }) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('details');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageLoading, setImageLoading] = useState({});

    useEffect(() => {
        if (!modal) {
            setSelectedImage(null);
        }
    }, [modal]);

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR');
    };

    const isPdfFile = (fileUrl) => {
        if (!fileUrl) return false;
        return fileUrl.toLowerCase().endsWith('.pdf');
    };

    const DetailsContent = () => (
        <KeyboardAwareFlatList
            data={[{ key: 'details' }]}
            keyExtractor={item => item.key}
            renderItem={() => (
                <View>
                    <Card style={styles.card} elevation={2}>
                        <Card.Content>
                            <View style={styles.headerSection}>
                                <View style={styles.projectIconContainer}>
                                    <Ionicons name="airplane" size={36} color={colors.primary} />
                                </View>
                                <View style={styles.headerInfo}>
                                    <Text style={styles.projectNameText}>{item?.projectName}</Text>
                                    <Text style={styles.codeText}>{item?.partCode}</Text>
                                    <Chip
                                        mode="outlined"
                                        style={styles.serialChip}
                                        textStyle={styles.serialChipText}
                                        icon="barcode-scan"
                                    >
                                        {item?.serialNumber}
                                    </Chip>
                                </View>
                            </View>

                            <Divider style={styles.divider} />

                            <View style={styles.infoGrid}>
                                <View style={styles.infoRow}>
                                    <View style={styles.infoItem}>
                                        <Text style={styles.infoLabel}>{t('responsible')}</Text>
                                        <View style={styles.infoValueContainer}>
                                            <Ionicons name="person" size={16} color={colors.primary} />
                                            <Text style={styles.infoValue}>{item?.responible || '-'}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.infoItem}>
                                        <Text style={styles.infoLabel}>{t('person_in_charge')}</Text>
                                        <View style={styles.infoValueContainer}>
                                            <Ionicons name="people" size={16} color={colors.primary} />
                                            <Text style={styles.infoValue}>{item?.personInCharge || '-'}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.infoRow}>
                                    <View style={styles.infoItem}>
                                        <Text style={styles.infoLabel}>{t('production_quantity')}</Text>
                                        <View style={styles.infoValueContainer}>
                                            <Ionicons name="cube" size={16} color={colors.primary} />
                                            <Text style={styles.infoValue}>{item?.productionQuantity || '-'}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.infoItem}>
                                        <Text style={styles.infoLabel}>{t('time_days')}</Text>
                                        <View style={styles.infoValueContainer}>
                                            <Ionicons name="time" size={16} color={colors.primary} />
                                            <Text style={styles.infoValue}>{item?.time || '-'} gün</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.statsRow}>
                                <View style={styles.statItem}>
                                    <Ionicons name="checkmark-done-circle" size={24} color={colors.success} />
                                    <Text style={styles.statCount}>{item?.basariliDurumlar?.length || 0}</Text>
                                    <Text style={styles.statLabel}>{t('success_states')}</Text>
                                </View>

                                <View style={styles.statItem}>
                                    <Ionicons name="alert-circle" size={24} color={colors.error} />
                                    <Text style={styles.statCount}>{item?.basarisizDurumlar?.length || 0}</Text>
                                    <Text style={styles.statLabel}>{t('issues')}</Text>
                                </View>

                                <View style={styles.statItem}>
                                    <Ionicons name="document-text" size={24} color={colors.warning} />
                                    <Text style={styles.statCount}>{item?.assemblyNotes?.length || 0}</Text>
                                    <Text style={styles.statLabel}>{t('notes')}</Text>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>

                    <Card style={styles.card} elevation={2}>
                        <Card.Content>
                            <Text style={styles.sectionTitle}>{t('description')}</Text>
                            <Text style={styles.description}>{item?.description || t('no_description')}</Text>
                        </Card.Content>
                    </Card>

                    <Card style={styles.card} elevation={2}>
                        <Card.Content>
                            <Text style={styles.sectionTitle}>{t('user_info')}</Text>
                            <View style={styles.userSection}>
                                <View style={styles.userAvatar}>
                                    <Text style={styles.avatarText}>
                                        {item?.user?.firstName?.[0]}{item?.user?.lastName?.[0]}
                                    </Text>
                                </View>
                                <View style={styles.userInfo}>
                                    <Text style={styles.userName}>{item?.user?.firstName} {item?.user?.lastName}</Text>
                                    <Text style={styles.userTitle}>{item?.user?.title}</Text>
                                    <Text style={styles.userDate}>
                                        <Ionicons name="calendar" size={14} color="#666" />
                                        {' '}{formatDate(item?.createdAt)}
                                    </Text>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                </View>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        />
    );

    const renderImageItem = ({ item: file, index }) => {
        const isPdf = isPdfFile(file);

        return (
            <TouchableOpacity
                style={styles.imageItem}
                onPress={() => setSelectedImage(file)}
                activeOpacity={0.8}
            >
                <View style={styles.imageContainer}>
                    {isPdf ? (
                        <View style={styles.pdfThumbnail}>
                            <Ionicons name="document-text" size={32} color={colors.primary} />
                            <Text style={styles.pdfLabel}>PDF</Text>
                        </View>
                    ) : (
                        <Image
                            source={{ uri: `${URL}${file}` }}
                            style={styles.thumbnail}
                            resizeMode="cover"
                            onLoadStart={() => {
                                setImageLoading(prev => ({ ...prev, [index]: true }));
                            }}
                            onLoadEnd={() => {
                                setImageLoading(prev => ({ ...prev, [index]: false }));
                            }}
                        />
                    )}

                    {imageLoading[index] && (
                        <View style={styles.imageLoading}>
                            <ActivityIndicator color={colors.primary} size="small" />
                        </View>
                    )}
                    <Text style={styles.imageIndex}>{index + 1}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.page, modal ? { display: 'flex' } : { display: 'none' }]}>
            <View style={styles.modal}>
                <View style={styles.modalHeader}>
                    <View style={styles.headerContent}>
                        <Text style={styles.modalTitle}>
                            {item?.projectName}
                            <Text style={styles.serialText}> ({item?.serialNumber})</Text>
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => setModal(false)} style={styles.closeBtn}>
                        <Ionicons name='close' size={28} style={styles.close} />
                    </TouchableOpacity>
                </View>

                <View style={styles.tabBar}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'details' && styles.activeTab]}
                        onPress={() => {
                            setActiveTab('details');
                            setSelectedImage(null);
                        }}>
                        <Ionicons
                            name="information-circle-outline"
                            size={20}
                            color={activeTab === 'details' ? colors.primary : '#777'}
                            style={styles.tabIcon}
                        />
                        <Text style={[styles.tabText, activeTab === 'details' && styles.activeTabText]}>
                            {t('details')}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'files' && styles.activeTab]}
                        onPress={() => {
                            setActiveTab('files');
                            setSelectedImage(null);
                        }}>
                        <Ionicons
                            name="images-outline"
                            size={20}
                            color={activeTab === 'files' ? colors.primary : '#777'}
                            style={styles.tabIcon}
                        />
                        <Text style={[styles.tabText, activeTab === 'files' && styles.activeTabText]}>
                            {t('files')} {item?.files?.length > 0 && `(${item.files.length})`}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.modalContent}>
                    {activeTab === 'details' ? (
                        <DetailsContent />
                    ) : (
                        <View style={styles.filesContainer}>
                            {item?.files?.length > 0 ? (
                                selectedImage ? (
                                    <View style={styles.selectedImageContainer}>
                                        <View style={styles.previewHeader}>
                                            <Text style={styles.previewTitle}>{t('file_preview')}</Text>
                                            <TouchableOpacity
                                                onPress={() => setSelectedImage(null)}
                                                style={styles.closePreviewBtn}
                                            >
                                                <Ionicons name="close-circle" size={24} color="#fff" />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={styles.pdfContainer}>
                                            {isPdfFile(selectedImage) ? (
                                                <Pdf
                                                    source={{ uri: `${URL}${selectedImage}` }}
                                                    style={styles.selectedImage}
                                                    onLoadComplete={(numberOfPages, filePath) => {
                                                        console.log(`PDF yüklendi: ${numberOfPages} sayfa`);
                                                    }}
                                                    onError={(error) => {
                                                        console.log('PDF yükleme hatası:', error);
                                                    }}
                                                    onPageChanged={(page, numberOfPages) => {
                                                        console.log(`Sayfa değişti: ${page}/${numberOfPages}`);
                                                    }}
                                                    enablePaging={true}
                                                    activityIndicator={() => (
                                                        <ActivityIndicator color={colors.primary} size="large" />
                                                    )}
                                                />
                                            ) : (
                                                <Image
                                                    source={{ uri: `${URL}${selectedImage}` }}
                                                    style={styles.selectedImage}
                                                    resizeMode="contain"
                                                />
                                            )}
                                        </View>

                                        <View style={styles.previewActions}>
                                            <Button
                                                mode="contained"
                                                icon="download"
                                                style={styles.downloadButton}
                                            >
                                                {t('download')}
                                            </Button>

                                            <Button
                                                mode="outlined"
                                                icon="close"
                                                onPress={() => setSelectedImage(null)}
                                                style={styles.closeButton}
                                                textColor="#fff"
                                            >
                                                {t('close')}
                                            </Button>
                                        </View>
                                    </View>
                                ) : (
                                    <FlatList
                                        data={item.files}
                                        renderItem={renderImageItem}
                                        keyExtractor={(item, index) => index.toString()}
                                        numColumns={3}
                                        style={styles.imageGrid}
                                        contentContainerStyle={styles.imageGridContent}
                                        showsVerticalScrollIndicator={false}
                                        initialNumToRender={12}
                                        maxToRenderPerBatch={12}
                                        windowSize={12}
                                        ListHeaderComponent={() => (
                                            <Text style={styles.filesSectionTitle}>{t('project_files')}</Text>
                                        )}
                                    />
                                )
                            ) : (
                                <View style={styles.emptyFilesContainer}>
                                    <Ionicons name="images-outline" size={64} color="#ccc" />
                                    <Text style={styles.emptyFilesText}>{t('no_files')}</Text>
                                </View>
                            )}
                        </View>
                    )}
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
    closeBtn: { padding: 4, },
    close: { color: '#fff', },
    tabBar: { flexDirection: 'row', backgroundColor: '#f5f5f5', borderBottomWidth: 1, borderBottomColor: '#e0e0e0', },
    tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, },
    tabIcon: { marginRight: 6, },
    activeTab: { borderBottomWidth: 3, borderBottomColor: colors.primary, },
    tabText: { fontSize: 14, color: '#777', fontWeight: '500', },
    activeTabText: { color: colors.primary, fontWeight: 'bold', },
    modalContent: { flex: 1, backgroundColor: '#f9f9f9', },
    scrollContent: { padding: 12, paddingBottom: 24 },
    card: { marginBottom: 12, borderRadius: 8, },
    headerSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, },
    projectIconContainer: { width: 70, height: 70, borderRadius: 35, backgroundColor: 'rgba(63, 81, 181, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 16, },
    headerInfo: { flex: 1, },
    projectNameText: { fontSize: 18, fontWeight: 'bold', color: '#333', },
    codeText: { fontSize: 15, color: '#666', marginVertical: 4, },
    serialChip: { alignSelf: 'flex-start', height: 28, marginTop: 4, backgroundColor: 'transparent', },
    serialChipText: { fontSize: 13, },
    divider: { height: 1, backgroundColor: '#e0e0e0', marginVertical: 16, },
    infoGrid: { marginBottom: 16, },
    infoRow: { flexDirection: 'row', marginBottom: 12, },
    infoItem: { flex: 1, },
    infoLabel: { fontSize: 12, color: '#888', marginBottom: 6, },
    infoValueContainer: { flexDirection: 'row', alignItems: 'center', },
    infoValue: { fontSize: 14, fontWeight: '500', color: '#333', marginLeft: 6, },
    statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 16, paddingVertical: 12, backgroundColor: '#f5f5f5', borderRadius: 8, },
    statItem: { alignItems: 'center', },
    statCount: { fontSize: 20, fontWeight: 'bold', marginTop: 4, },
    statLabel: { fontSize: 12, color: '#666', marginTop: 2, },
    sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.primary, marginBottom: 10, },
    description: { fontSize: 14, lineHeight: 22, color: '#444', },
    userSection: { flexDirection: 'row', alignItems: 'center', },
    userAvatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: 12, },
    avatarText: { color: '#fff', fontSize: 18, fontWeight: 'bold', },
    userInfo: { flex: 1, },
    userName: { fontSize: 16, fontWeight: '600', },
    userTitle: { fontSize: 14, color: '#666', marginTop: 2, },
    userDate: { fontSize: 12, color: '#888', marginTop: 6, flexDirection: 'row', alignItems: 'center', },
    filesContainer: { flex: 1, padding: 12, },
    filesSectionTitle: { fontSize: 16, fontWeight: '600', color: colors.primary, marginBottom: 16, },
    imageGrid: { flex: 1, },
    imageGridContent: { paddingBottom: 12, },
    imageItem: { width: '33.33%', padding: 4, },
    imageContainer: { position: 'relative', borderRadius: 6, overflow: 'hidden', borderWidth: 1, borderColor: '#e0e0e0', },
    thumbnail: { width: '100%', aspectRatio: 1, },
    imageIndex: { position: 'absolute', bottom: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff', padding: 4, fontSize: 10, borderTopLeftRadius: 4, },
    imageLoading: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.5)', },
    selectedImageContainer: { flex: 1, backgroundColor: '#000', borderRadius: 8, overflow: 'hidden', marginBottom: 8, display: 'flex', flexDirection: 'column' },
    pdfContainer: { flex: 1, width: '100%' },
    previewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, backgroundColor: 'rgba(0,0,0,0.7)', },
    previewTitle: { color: '#fff', fontWeight: '600', },
    closePreviewBtn: { padding: 4, },
    selectedImage: { flex: 1, width: '100%', },
    previewActions: { flexDirection: 'row', padding: 12, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end', },
    downloadButton: { marginRight: 8, backgroundColor: colors.primary, },
    closeButton: { borderColor: '#fff', },
    emptyFilesContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', },
    emptyFilesText: { fontSize: 16, color: '#888', marginTop: 16, },
    pdfThumbnail: { width: '100%', aspectRatio: 1, backgroundColor: 'rgba(63, 81, 181, 0.1)', justifyContent: 'center', alignItems: 'center', },
    pdfLabel: { marginTop: 5, color: colors.primary, fontSize: 12, fontWeight: 'bold', },
});

export default AssemblyManualModal;