import { Ionicons } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, TextInput, Alert } from 'react-native'
import { colors } from '../../utilities/colors'
import { Card, Divider, Chip, ActivityIndicator } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { URL } from '../../api'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTechnicalDrawingGet } from '../../redux/slices/technicalDrawingGetSlice'
import { useNavigation } from '@react-navigation/native'
import ViewShot from 'react-native-view-shot'
import TechnicalDrawingNoteModal from './technicalDrawingNoteModal'
import PdfRendererView from 'react-native-pdf-renderer'
import RNFS from 'react-native-fs'
import { fetchTechnicalDrawingVisualNoteCreate } from '../../redux/slices/technicalDrawingVisualNoteCreateSlice'

const TechnicalDrawingDetailPage = ({ route }) => {
    const { id } = route.params;
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('details');
    const [selectedImage, setSelectedImage] = useState(null);
    const [noteModal, setNoteModal] = useState(false);
    const [visualModal, setVisualModal] = useState(false);
    const data = useSelector(state => state.technicalDrawingGet.data);
    const [imageLoading, setImageLoading] = useState({});
    const [downloading, setDownloading] = useState(false);
    const [localPdfPath, setLocalPdfPath] = useState(null);
    const [screenshotUri, setScreenshotUri] = useState(null);
    const [screenshotModal, setScreenshotModal] = useState(false);
    const [notePoints, setNotePoints] = useState([]);
    const [addingNote, setAddingNote] = useState(false);
    const [noteText, setNoteText] = useState('');
    const [currentPoint, setCurrentPoint] = useState(null);
    const previewRef = React.useRef();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleSaveScreenshotWithNotesAndSend = async () => {
        if (previewRef.current) {
            try {
                const uri = await previewRef.current.capture();
                setScreenshotUri(uri);
                setScreenshotModal(true);

                const fileName = `visual_note_${Date.now()}.jpg`;
                const file = {
                    uri,
                    type: 'image/jpeg',
                    name: fileName,
                };

                const formData = {
                    file: [file],
                };

                await dispatch(fetchTechnicalDrawingVisualNoteCreate({ formData: formData, manualId: id }));

                setCurrentPoint(null);
                setAddingNote(false)
                setNoteText('');
                setNotePoints([]);
                setScreenshotUri(null)
                setScreenshotModal(false);
                setVisualModal(false);

                Alert.alert('Başarılı', 'Notlu görsel başarıyla gönderildi.');
            } catch (e) {
                Alert.alert('Ekran görüntüsü gönderilemedi', e.message);
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR');
    };

    const isPdfFile = (fileName) => {
        if (!fileName) return false;
        return fileName.toLowerCase().endsWith('.pdf');
    };

    const handleImagePress = (event) => {
        const { locationX, locationY } = event.nativeEvent;
        setCurrentPoint({ x: locationX, y: locationY });
        setAddingNote(true);
        setNoteText('');
    };

    const handleSaveNote = () => {
        if (currentPoint && noteText.trim()) {
            setNotePoints([...notePoints, { ...currentPoint, text: noteText }]);
            setAddingNote(false);
            setCurrentPoint(null);
            setNoteText('');
        }
    };

    const downloadAndShowPdf = async (remoteUrl) => {
        try {
            setDownloading(true);
            const localPath = `${RNFS.DocumentDirectoryPath}/technicalDrawing_temp_${Date.now()}.pdf`;
            const downloadResult = await RNFS.downloadFile({
                fromUrl: remoteUrl,
                toFile: localPath,
            }).promise;
            setDownloading(false);
            if (downloadResult.statusCode === 200) {
                setLocalPdfPath(`file://${localPath}`);
            } else {
                Alert.alert('PDF indirilemedi', t('no_files'));
            }
        } catch (e) {
            setDownloading(false);
            Alert.alert('PDF indirme hatası', e.message);
        }
    };

    const handleFileSelect = async (file) => {
        setLocalPdfPath(null);
        setSelectedImage(file);
        setVisualModal(true);
        if (isPdfFile(file)) {
            const remoteUrl = file.startsWith('http') ? file : `${URL}${file}`;
            await downloadAndShowPdf(remoteUrl);
        }
    };

    const handleTakeScreenshot = async () => {
        if (previewRef.current) {
            try {
                const uri = await previewRef.current.capture();
                setScreenshotUri(uri);
                setScreenshotModal(true);
            } catch (e) {
                Alert.alert('Ekran görüntüsü alınamadı', e.message);
            }
        }
    };

    const DetailsContent = () => (
        <KeyboardAwareFlatList
            data={[{ key: 'details' }]}
            keyExtractor={data => data.key}
            renderItem={() => (
                <View>
                    <Card style={styles.card} elevation={2}>
                        <Card.Content>
                            <View style={styles.headerSection}>
                                <View style={styles.projectIconContainer}>
                                    <Ionicons name="airplane" size={36} color={colors.primary} />
                                </View>
                                <View style={styles.headerInfo}>
                                    <Text style={styles.projectNameText}>{data?.projectName}</Text>
                                    <Text style={styles.codeText}>{data?.partCode}</Text>
                                    <Chip
                                        mode="outlined"
                                        style={styles.serialChip}
                                        textStyle={styles.serialChipText}
                                        icon="barcode-scan"
                                    >
                                        {data?.serialNumber}
                                    </Chip>
                                </View>
                            </View>
                            <Divider style={styles.divider} />
                            <View style={styles.infoGrid}>
                                <View style={styles.infoRow}>
                                    <View style={styles.infoItem}>
                                        <Text style={styles.infoLabel}>{t('operator')}</Text>
                                        <View style={styles.infoValueContainer}>
                                            <Ionicons name="person" size={16} color={colors.primary} />
                                            <Text style={styles.infoValue}>{`${data?.responible?.firstName} ${data?.responible?.lastName}` || '-'}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.infoItem}>
                                        <Text style={styles.infoLabel}>{t('responsible')}</Text>
                                        <View style={styles.infoValueContainer}>
                                            <Ionicons name="people" size={16} color={colors.primary} />
                                            <Text style={styles.infoValue}>{`${data?.personInCharge?.firstName} ${data?.personInCharge?.lastName}` || '-'}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.infoRow}>
                                    <View style={styles.infoItem}>
                                        <Text style={styles.infoLabel}>{t('production_quantity')}</Text>
                                        <View style={styles.infoValueContainer}>
                                            <Ionicons name="cube" size={16} color={colors.primary} />
                                            <Text style={styles.infoValue}>{data?.productionQuantity || '-'}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.infoItem}>
                                        <Text style={styles.infoLabel}>{t('time_days')}</Text>
                                        <View style={styles.infoValueContainer}>
                                            <Ionicons name="time" size={16} color={colors.primary} />
                                            <Text style={styles.infoValue}>{data?.time || '-'} gün</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.statsRow}>
                                <View style={styles.statItem}>
                                    <Ionicons name="checkmark-done-circle" size={24} color={colors.success} />
                                    <Text style={styles.statCount}>{data?.basariliDurumlar?.length || 0}</Text>
                                    <Text style={styles.statLabel}>{t('success_states')}</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Ionicons name="alert-circle" size={24} color={colors.error} />
                                    <Text style={styles.statCount}>{data?.basarisizDurumlar?.length || 0}</Text>
                                    <Text style={styles.statLabel}>{t('issues')}</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Ionicons name="document-text" size={24} color={colors.warning} />
                                    <Text style={styles.statCount}>{data?.technicalDrawingNotes?.length || 0}</Text>
                                    <Text style={styles.statLabel}>{t('notes')}</Text>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card} elevation={2}>
                        <Card.Content>
                            <Text style={styles.sectionTitle}>{t('description')}</Text>
                            <Text style={styles.description}>{data?.description || t('no_description')}</Text>
                        </Card.Content>
                    </Card>
                    <Card style={styles.card} elevation={2}>
                        <Card.Content>
                            <Text style={styles.sectionTitle}>{t('user_info')}</Text>
                            <View style={styles.userSection}>
                                <View style={styles.userAvatar}>
                                    <Text style={styles.avatarText}>
                                        {data?.user?.firstName?.[0]}{data?.user?.lastName?.[0]}
                                    </Text>
                                </View>
                                <View style={styles.userInfo}>
                                    <Text style={styles.userName}>{data?.user?.firstName} {data?.user?.lastName}</Text>
                                    <Text style={styles.userTitle}>{data?.user?.title}</Text>
                                    <Text style={styles.userDate}>
                                        <Ionicons name="calendar" size={14} color="#666" />
                                        {' '}{formatDate(data?.createdAt)}
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
                onPress={() => handleFileSelect(file)}
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

    const getData = async () => {
        await dispatch(fetchTechnicalDrawingGet({ id: id }))
    }

    useEffect(() => { getData() }, [dispatch])

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: `${data?.projectName} (${data?.serialNumber})`,
            headerRight: () => {
                return (
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
                            <Ionicons name='chevron-back-outline' size={28} style={styles.close} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setNoteModal(true)} style={styles.closeBtn}>
                            <Ionicons name='chatbox-outline' size={28} style={styles.close} />
                        </TouchableOpacity>
                        {visualModal ? (
                            <TouchableOpacity onPress={handleTakeScreenshot} style={styles.closeBtn}>
                                <Ionicons name='camera-outline' size={28} style={styles.close} />
                            </TouchableOpacity>
                        ) : null}
                    </View>
                )
            }
        })
    }, [navigation, id, data, selectedImage, visualModal])

    return (
        <View style={styles.page}>
            <View style={styles.modal}>
                <View style={styles.tabBar}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'details' && styles.activeTab]}
                        onPress={() => {
                            setActiveTab('details');
                            setSelectedImage(null);
                            setLocalPdfPath(null);
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
                            setLocalPdfPath(null);
                        }}>
                        <Ionicons
                            name="images-outline"
                            size={20}
                            color={activeTab === 'files' ? colors.primary : '#777'}
                            style={styles.tabIcon}
                        />
                        <Text style={[styles.tabText, activeTab === 'files' && styles.activeTabText]}>
                            {t('files')} {data?.files?.length > 0 && `(${data.files.length})`}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.modalContent}>
                    {activeTab === 'details' ? (
                        <DetailsContent />
                    ) : (
                        <View style={styles.filesContainer}>
                            {data?.files?.length > 0 ? (
                                selectedImage ? (
                                    <View style={styles.selectedImageContainer}>
                                        <View style={styles.previewHeader}>
                                            <Text style={styles.previewTitle}>{t('file_preview')}</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setSelectedImage(null);
                                                    setLocalPdfPath(null);
                                                    setVisualModal(false);
                                                }}
                                                style={styles.closePreviewBtn}
                                            >
                                                <Ionicons name="close-circle" size={24} color="#fff" />
                                            </TouchableOpacity>
                                        </View>
                                        <ViewShot
                                            ref={previewRef}
                                            options={{ format: 'jpg', quality: 0.9, result: 'tmpfile' }}
                                            style={styles.pdfContainer}
                                        >
                                            {downloading ? (
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                    <ActivityIndicator color={colors.primary} size="large" />
                                                    <Text style={{ color: '#fff', marginTop: 10 }}>{t('downloading')}</Text>
                                                </View>
                                            ) : isPdfFile(selectedImage) ? (
                                                localPdfPath ? (
                                                    <PdfRendererView
                                                        style={{ flex: 1, backgroundColor: '#000' }}
                                                        source={localPdfPath}
                                                        distanceBetweenPages={16}
                                                        maxZoom={5}
                                                        minZoom={1}
                                                        onPageChange={(current, total) => { }}
                                                    />
                                                ) : (
                                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                        <ActivityIndicator color={colors.primary} size="large" />
                                                        <Text style={{ color: '#fff', marginTop: 10 }}>{t('preparing_pdf')}</Text>
                                                    </View>
                                                )
                                            ) : (
                                                <Image
                                                    source={{ uri: `${URL}${selectedImage}` }}
                                                    style={styles.selectedImage}
                                                    resizeMode="contain"
                                                />
                                            )}
                                        </ViewShot>
                                    </View>
                                ) : (
                                    <FlatList
                                        data={data.files}
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
            {screenshotModal && (
                <View style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', zIndex: 999
                }}>
                    <View style={{ width: '90%', height: '70%', backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                        <ViewShot
                            ref={previewRef}
                            options={{ format: 'jpg', quality: 0.9, result: 'tmpfile' }}
                            style={{ flex: 1, width: '100%', height: '100%' }}
                        >
                            <TouchableOpacity
                                activeOpacity={1}
                                style={{ flex: 1 }}
                                onPress={handleImagePress}
                            >
                                <Image
                                    source={{ uri: screenshotUri }}
                                    style={{ width: '100%', height: '100%', resizeMode: 'contain', position: 'absolute' }}
                                />
                                {notePoints.map((point, idx) => (
                                    <View
                                        key={idx}
                                        style={{
                                            position: 'absolute',
                                            left: point.x - 10,
                                            top: point.y - 10,
                                            backgroundColor: '#ffeb3b',
                                            borderRadius: 8,
                                            padding: 4,
                                            minWidth: 40,
                                            minHeight: 24,
                                            zIndex: 10,
                                        }}
                                    >
                                        <Text style={{ fontSize: 12, color: '#333' }}>{point.text}</Text>
                                    </View>
                                ))}
                                {addingNote && currentPoint && (
                                    <View
                                        style={{
                                            position: 'absolute',
                                            left: currentPoint.x - 10,
                                            top: currentPoint.y - 10,
                                            backgroundColor: '#fff',
                                            borderRadius: 8,
                                            padding: 6,
                                            minWidth: 120,
                                            zIndex: 20,
                                            elevation: 5,
                                            borderWidth: 1,
                                            borderColor: '#ccc'
                                        }}
                                    >
                                        <TextInput
                                            value={noteText}
                                            onChangeText={setNoteText}
                                            placeholder="Notunuzu yazın"
                                            style={{ minHeight: 30, fontSize: 13, color: '#333' }}
                                            multiline
                                        />
                                        <TouchableOpacity
                                            onPress={handleSaveNote}
                                            style={{ marginTop: 6, backgroundColor: colors.primary, borderRadius: 6, padding: 6, alignSelf: 'flex-end' }}
                                        >
                                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Tamamla</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </ViewShot>
                        <TouchableOpacity
                            onPress={handleSaveScreenshotWithNotesAndSend}
                            style={{ position: 'absolute', bottom: 20, right: 20, backgroundColor: colors.primary, borderRadius: 20, padding: 10, zIndex: 100 }}
                        >
                            <Ionicons name="download-outline" size={28} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setScreenshotModal(false)}
                            style={{ position: 'absolute', top: 10, right: 10, backgroundColor: '#0008', borderRadius: 20, padding: 6 }}
                        >
                            <Ionicons name="close-circle" size={32} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            <TechnicalDrawingNoteModal modal={noteModal} item={data} setModal={setNoteModal} />
        </View>
    );
};

const styles = StyleSheet.create({
    page: { backgroundColor: '#f5f5f5', flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center', },
    modal: { width: '100%', height: '95%', backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', },
    headerRight: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.primary, paddingVertical: 12, paddingHorizontal: 16, },
    headerContent: { flex: 1, },
    modalTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', },
    serialText: { fontSize: 16, fontWeight: 'normal', },
    closeBtn: { marginRight: 30, marginLeft: 20, marginTop: 10 },
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

export default TechnicalDrawingDetailPage;