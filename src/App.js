import React, { useState, useEffect } from 'react';

// Main App component
const App = () => {
    const [postContent, setPostContent] = useState('Sedang menjana posting...');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copySuccess, setCopySuccess] = useState(''); // State for copy success message

    // List of 30 points about Anwar Ibrahim's leadership and achievements
    // Excluded: "Akta Tanggungjawab Fiskal (FRA)" and "Nyahjenayah Percubaan Membunuh Diri"
    const allThemes = [
        "Kestabilan Politik yang Kukuh dan Pengurusan Gabungan: Beliau berjaya mewujudkan persekitaran politik yang lebih stabil, menguruskan parlimen tergantung dan ketegangan gabungan, serta menyatukan parti pelbagai seperti UMNO dan blok Sabah serta Sarawak, mengurangkan ketidakstabilan politik yang ketara sebelum ini.",
        "Majoriti Dua Pertiga di Parlimen: Pentadbiran beliau kini memegang majoriti dua pertiga di Parlimen, memberikan kestabilan yang diperlukan untuk melaksanakan dasar dengan berkesan.",
        "Peningkatan Sokongan Rakyat dan Ketabahan Kepimpinan: Rating kelulusan Perdana Menteri telah meningkat kepada 54-55 peratus, mencerminkan kepercayaan rakyat terhadap kepimpinan beliau, walaupun menghadapi penjara dan penganiayaan politik, karisma dan ketabahan Anwar mendapat sokongan ramai.",
        "Keyakinan Terhadap Hala Tuju Negara: Terdapat penurunan dalam jumlah pengundi yang menganggap negara sedang menuju ke arah yang salah, menunjukkan sentimen yang lebih positif terhadap hala tuju negara.",
        "Tadbir Urus Berbilang Kaum dan Keterangkungan: Sebagai Perdana Menteri pertama dari parti berbilang kaum, beliau mempromosikan keterangkungan dalam masyarakat pelbagai etnik, menggubbal dasar yang mengimbangi hak orang Melayu dengan keadilan untuk komuniti minoriti Cina dan India, mengurangkan polarisasi.",
        "Pertumbuhan KDNK yang Mengagumkan: Ekonomi Malaysia mencatatkan pertumbuhan Keluaran Dalam Negara Kasar (KDNK) yang kukuh sebanyak 5.1 peratus pada tahun 2024, mengatasi unjuran asal, membuktikan keberkesanan Dasar Ekonomi MADANI.",
        "Pelaburan Diluluskan Tertinggi dalam Sejarah: Malaysia mencatatkan jumlah pelaburan diluluskan tertinggi sebanyak RM329.5 bilion pada tahun 2023, menunjukkan pemulihan dan kebangkitan semula ekonomi.",
        "Daya Tarikan Pelaburan Asing yang Signifikan: Pelaburan asing merupakan penyumbang utama sebanyak 57.2 peratus daripada jumlah pelaburan diluluskan, dengan syarikat global seperti Tesla dan Intel membuka atau meningkatkan operasi di Malaysia, mengukuhkan kedudukan ekonomi global negara.",
        "Pengurusan Fiskal yang Berhemat: Kerajaan berjaya mengurangkan defisit fiskal kepada 4.1 peratus pada 2024, lebih baik daripada sasaran awal, menunjukkan komitmen terhadap kemampanan kewangan jangka panjang.",
        "Pemulihan Eksport dan Pelancongan: Pertumbuhan ekonomi didorong oleh pemulihan eksport, terutamanya dalam sektor elektrik dan elektronik, serta peningkatan perbelanjaan isi rumah dan pemulihan pelancongan.",
        "Pelan Induk Kerjasama Awam Swasta 2030 (PIKAS 2030): Pelancaran PIKAS 2030 dijangka menjana pertumbuhan pelaburan swasta sebanyak RM78 bilion dan mencipta 900,000 peluang pekerjaan menjelang 2030.",
        "Komitmen Membanteras Rasuah Sistemik: Beliau meletakkan komitmen kukuh untuk membersihkan rasuah sistemik, melaksanakan sistem tender terbuka untuk kontrak kerajaan, berbeza daripada amalan rundingan sebelum ini, termasuk menangani skandal seperti 1MDB.",
        "Penggubalan Akta Kebebasan Maklumat (FOIA): Akta ini dijangka dibentangkan di Parlimen untuk memberikan akses sebenar kepada rakyat terhadap keputusan kerajaan, penting untuk membina keyakinan dan penyertaan bermakna dalam demokrasi.",
        "Pindaan Akta Perlindungan Pemberi Maklumat: Pindaan menyeluruh dilakukan terhadap Akta Perlindungan Pemberi Maklumat 2010 untuk memperkukuh perlindungan kepada pelapor dan menubuhkan Jawatankuasa Perlindungan Pemberi Maklumat yang bebas.",
        "Komitmen Terhadap Kebebasan Kehakiman dan Agenda Reformasi: Sejarah panjang Anwar sebagai reformis sejak gerakan reformasi 1998 menunjukkan komitmennya terhadap kebebasan kehakiman, demokrasi, dan akauntabiliti institusi, menegaskan bahawa beliau tidak akan mengarah hakim membuat keputusan mengikut tekanan politik.",
        "Sasaran Jangka Panjang Anti-Rasuah: Kerajaan menetapkan sasaran untuk berada dalam kelompok 25 negara terbaik dunia dalam Indeks Persepsi Rasuah menjelang 2033 melalui Strategi Antirasuah Nasional (NACS) 2024–2028, menunjukkan komitmen jangka panjang.",
        "Penubuhan Jawatankuasa Parlimen untuk Pengawasan: Beliau menubuhkan jawatankuasa parlimen untuk mengawasi menteri dan penjawat awam, mengukuhkan tadbir urus demokratik.",
        "Peningkatan Sumbangan Asas Rahmah (SARA): Peruntukan SARA melonjak lebih lima kali ganda kepada RM700 juta, dengan jumlah penerima bertambah kepada 700,000 orang dan jumlah bantuan dinaikkan sehingga RM1,200.",
        "Peningkatan Bantuan Tunai Rahmah (STR) dan JKM: Peruntukan STR dan SARA ditingkatkan kepada RM13 bilion pada 2025, memberi manfaat kepada 9 juta penerima, serta peningkatan bantuan tunai di bawah Jabatan Kebajikan Masyarakat (JKM) kepada RM2.9 bilion.",
        "Fokus kepada Pembasmian Kemiskinan Berasaskan Keperluan: Anwar mengalihkan dasar bantuan kepada berasaskan keperluan, bukan kaum, menangani kemiskinan merentas etnik, selaras dengan visinya untuk pembangunan ekonomi yang saksama dan mengurangkan ketegangan antara komuniti.",
        "Program Menangani Kos Sara Hidup Lain: Peruntukan keseluruhan RM1 bilion disediakan untuk inisiatif seperti Program Payung Rahmah dan Jualan Rahmah, serta pengedaran barangan keperluan asas di kawasan pedalaman dan desa.",
        "Pelepasan Cukai Pendapatan Individu: Pelepasan cukai dinaikkan untuk bayaran premium insurans pendidikan dan perubatan, serta perbelanjaan perubatan, dan pengecualian cukai pendapatan sumber luar negara dilanjutkan sehingga 31 Disember 2036.",
        "Pemansuhan Hukuman Mati Mandatori: Melaksanakan reformasi perundangan penting seperti pemansuhan hukuman mati mandatori, selaras dengan hala tuju ihsan baharu serta piawaian antarabangsa.",
        "Pemerkasaan Pendidikan dan Perpaduan Sosial: Beliau menekankan pendidikan untuk memerangi ekstremisme, rasisme, dan fanatisme agama, bertujuan mencipta kurikulum yang lebih inklusif, penting untuk kestabilan sosial jangka panjang dalam masyarakat pelbagai kaum.",
        "Reformasi Perundangan untuk Teknologi Baharu: Kerajaan sedang mempersiapkan reformasi perundangan untuk menampung kemalangan yang melibatkan kereta pandu sendiri, salah laku oleh robot, dan pelbagai kemungkinan lain menuju ke era robot dan kecerdasan buatan.",
        "Pindaan Perlembagaan Persekutuan: Dicadangkan untuk menetapkan had tempoh jawatan Perdana Menteri kepada dua penggal, serta memperkukuh hubungan antara Kerajaan Negeri dengan Kerajaan Persekutuan.",
        "Diplomasi Antarabangsa yang Berwibawa dan Peningkatan Imej Negara: Kepimpinan diplomatik Perdana Menteri telah memulihkan reputasi Malaysia dan memperkukuh hubungan dua hala serta penglibatan serantau, menarik pelabur antarabangsa dan meningkatkan imej negara.",
        "Peranan Aktif dalam Hal Ehwal Serantau dan Global: Malaysia memainkan peranan penting dalam hal ehwal serantau, termasuk seruan untuk mengukuhkan perdagangan intra-ASEAN, menangani krisis Myanmar, konflik selatan Thailand, dan kesediaan menjadi pengantara konflik antara India dan Pakistan."
    ];

    // Function to fetch content from the Gemini API
    const generateFacebookPost = async () => {
        setIsLoading(true);
        setError(null);
        setPostContent('Sedang menjana posting...'); // Reset content while loading
        setCopySuccess(''); // Clear copy success message on new generation

        // Select a few random themes to ensure variety in prompts
        const selectedThemes = [];
        const numThemesToSelect = Math.floor(Math.random() * (5 - 3 + 1)) + 3; // Randomly select between 3 to 5 themes
        while (selectedThemes.length < numThemesToSelect) {
            const randomIndex = Math.floor(Math.random() * allThemes.length);
            const theme = allThemes[randomIndex];
            if (!selectedThemes.includes(theme)) {
                selectedThemes.push(theme);
            }
        }

        // Modified prompt to explicitly ask for ONE posting with sentence limits
        const prompt = `Sebagai seorang penyokong teguh Perdana Menteri Anwar Ibrahim, tulis SATU posting Facebook yang unik dan meyakinkan dalam Bahasa Melayu. Posting ini perlu antara 6 hingga 10 ayat. Sorot sekurang-kurangnya dua hingga tiga pencapaian atau ciri kepimpinan beliau yang penting, berdasarkan poin-poin berikut: ${selectedThemes.join('; ')}. Pastikan nada positif, bersemangat, dan bermotivasi untuk menggalakkan sokongan berterusan. Elakkan pengulangan idea yang sama dalam setiap ayat. Setiap posting mestilah sangat berbeza dari posting lain yang telah dijana sebelum ini.`;

        try {
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: prompt }] });
            const payload = { contents: chatHistory };
            // >>> IMPORTANT: Replace "YOUR_GENERATED_API_KEY_HERE" with your actual API key <<<
            const apiKey = process.env.REACT_APP_GEMINI_API_KEY; 

            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API error: ${response.status} ${response.statusText} - ${errorData.error?.message || 'Unknown error'}`);
            }

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                setPostContent(text);
            } else {
                setPostContent('Gagal menjana posting. Sila cuba lagi.');
                setError('Respons API tidak mengandungi kandungan yang dijangkakan.');
                console.error('Unexpected API response structure:', result);
            }
        } catch (err) {
            console.error('Error generating Facebook post:', err);
            setPostContent('Maaf, terdapat ralat semasa menjana posting. Sila cuba lagi.');
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to copy post content to clipboard
    const copyToClipboard = () => {
        // Create a temporary textarea element to hold the text
        const textarea = document.createElement('textarea');
        textarea.value = postContent;
        document.body.appendChild(textarea);
        textarea.select(); // Select the text
        document.execCommand('copy'); // Copy the selected text
        document.body.removeChild(textarea); // Remove the temporary textarea

        setCopySuccess('Disalin!'); // Set success message
        setTimeout(() => setCopySuccess(''), 2000); // Clear message after 2 seconds
    };

    // Initial generation on component mount
    useEffect(() => {
        generateFacebookPost();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 font-sans">
            {/* The script and link tags for Tailwind CSS and Inter font are now in public/index.html */}
            {/* The style block for body font-family is now in src/index.css */}

            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full text-center border border-gray-200">
                <h1 className="text-3xl font-bold text-indigo-800 mb-2">
                    <span className="text-blue-600">Sokongan</span> Untuk Perdana Menteri Anwar Ibrahim
                </h1>
                <p className="text-gray-500 text-sm mb-6">
                    Powered by Cabang Sungai Siput
                </p>
                <p className="text-gray-600 mb-8">
                    Jana posting Facebook unik untuk menunjukkan sokongan anda!
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 min-h-[150px] flex items-center justify-center">
                    {isLoading ? (
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
                            <p className="text-blue-700">Sedang menjana posting...</p>
                        </div>
                    ) : error ? (
                        <p className="text-red-600 font-medium">{error}</p>
                    ) : (
                        <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">{postContent}</p>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                    <button
                        onClick={generateFacebookPost}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 w-full sm:w-auto"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Menjana...' : 'Jana Posting Baharu'}
                    </button>

                    <button
                        onClick={copyToClipboard}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 w-full sm:w-auto"
                        disabled={isLoading || !postContent || error} // Disable if loading, no content, or error
                    >
                        Salin Posting
                    </button>
                </div>

                {copySuccess && (
                    <p className="text-green-600 font-semibold text-sm mt-2 animate-bounce">
                        {copySuccess}
                    </p>
                )}

                {/* Optional: Add a small footer for context */}
                <p className="text-gray-400 text-sm mt-8">
                    Posting dijana berdasarkan maklumat awam mengenai pencapaian Perdana Menteri Anwar Ibrahim.
                </p>
            </div>
        </div>
    );
};

export default App;
