// Nội dung được biên soạn lại từ tài liệu cục bộ; xem docs/SOURCES.md.
// q: câu hỏi, options: các lựa chọn, answer: chỉ số đáp án (bắt đầu từ 0).
const v = (term, meaning, type, example, note = '') => ({ term, meaning, type, example, note });
const q = (prompt, options, answer, explanation) => ({ prompt, options, answer, explanation });
const tr = (prompt, reference, notes) => ({ prompt, reference, notes });
const unit1 = '1/Unit 1_EARLY CIVILIZATIONS_Text.docx';
const unit2 = '1/UNIT 2- EXPLORATIONS AND REVOLUTIONS - text.pdf';
const vietnam = '1/Week 6-9_ Lesson 1_History of Vietnam.pdf';
const mac = '2/Macmillan_history7.pdf';
const mcg = '2/McGrawHillGlencoe textbook.pdf';

// Bump when quiz wording/answer meanings change; old attempts must not be regraded.
export const CONTENT_REVISION = 2;

export const groups = {
  reading: { label: 'English through History', short: 'Tiếng Anh qua bài đọc', folder: '01', description: 'Đọc một câu chuyện. Học từ trong ngữ cảnh. Luyện dịch và kiểm tra điều bạn hiểu.' },
  textbook: { label: 'Inside the Textbook', short: 'Khám phá sách giáo khoa', folder: '02', description: 'Hiểu thuật ngữ, cấu trúc sách và những hoạt động giúp việc học trở nên hiệu quả.' }
};

export const lessons = [
  {
    id: 'egypt', group: 'reading', title: 'Ancient Egypt', subtitle: 'Món quà của sông Nile', topic: 'Early civilizations', minutes: 20, art: 'egypt',
    description: 'Khám phá cách một dòng sông nuôi dưỡng cả nền văn minh.',
    sources: [{ file: unit1, section: 'Ancient Egypt' }],
    reading: [
      'The River Nile played a central role in ancient Egypt. Much of the country received very little rainfall, so the river supplied water for farming. Each year, floods left fertile mud on the surrounding land. This helped farmers grow crops and supported the development of a prosperous country.',
      'Egyptian rulers were called pharaohs. A pharaoh held several positions: king, chief judge, high priest, and commander of the army. Officials appointed by the ruler managed departments such as the treasury and kept government records. During the Old Kingdom, pharaohs used their power and resources to build pyramids that expressed their connection to the gods.'
    ],
    readingSupport: [
      'Sông Nile giữ vai trò trung tâm trong đời sống Ai Cập cổ đại. Phần lớn đất nước có lượng mưa rất ít, vì vậy dòng sông cung cấp nước cho canh tác. Mỗi năm, lũ để lại lớp bùn màu mỡ trên vùng đất xung quanh. Điều này giúp nông dân trồng trọt và hỗ trợ sự phát triển của một đất nước thịnh vượng.',
      'Những người cai trị Ai Cập được gọi là pharaoh. Một pharaoh đảm nhiệm nhiều vai trò: nhà vua, người đứng đầu xét xử, tư tế tối cao và tổng chỉ huy quân đội. Các quan chức do nhà vua bổ nhiệm quản lý những cơ quan như ngân khố và lưu giữ hồ sơ chính quyền. Trong thời Cổ Vương quốc, các pharaoh dùng quyền lực và nguồn lực để xây những kim tự tháp thể hiện mối liên hệ của họ với các vị thần.'
    ],
    vocabulary: [
      v('fertile', 'màu mỡ', 'adjective', 'Floods left fertile mud on the land.'),
      v('rainfall', 'lượng mưa', 'noun', 'The region received very little rainfall.'),
      v('crop', 'cây trồng; nông sản', 'noun', 'Farmers grew crops near the river.'),
      v('prosperous', 'thịnh vượng', 'adjective', 'Farming helped the country become prosperous.'),
      v('appoint', 'bổ nhiệm', 'verb', 'The ruler appointed officials.'),
      v('treasury', 'cơ quan quản lý ngân khố', 'noun', 'Officials managed the treasury.')
    ],
    enVi: tr('Each year, floods left fertile mud on the surrounding land. This helped farmers grow crops.', 'Mỗi năm, lũ lụt để lại lớp bùn màu mỡ trên vùng đất xung quanh. Điều này giúp nông dân trồng trọt.', ['left là quá khứ của leave: để lại.', 'help someone do something: giúp ai làm việc gì.']),
    viEn: tr('Sông Nile cung cấp nước cho nông nghiệp. Các quan chức do nhà vua bổ nhiệm quản lý các cơ quan của chính quyền.', 'The Nile supplied water for farming. Officials appointed by the king managed government departments.', ['Có thể dùng provided water thay cho supplied water.', 'appointed by the king bổ nghĩa cho officials.']),
    quiz: [
      q('What is the main idea of the first paragraph?', ['Seasonal rain made farming possible throughout Egypt.', 'The Nile supported agriculture and Egypt’s development.', 'Pyramid building provided most of Egypt’s resources.', 'Government departments organized the yearly floods.'], 1, 'Đoạn 1 giải thích vai trò của nước và bùn màu mỡ từ sông Nile. Lượng mưa ít là lý do cần dòng sông, không phải nguồn nước chính.'),
      q('How did the annual floods help crops grow?', ['They deposited fertile mud on the surrounding land.', 'They carried crops from the fields to the cities.', 'They brought regular rainfall to the surrounding desert.', 'They kept the soil dry throughout the growing season.'], 0, 'Bài nêu floods left fertile mud: lớp bùn màu mỡ giúp trồng trọt. Không có thông tin lũ tạo mưa hay vận chuyển cây trồng.'),
      q('In “officials appointed by the ruler”, “appointed” means…', ['trained to manage records', 'born into a royal family', 'chosen to hold a position', 'paid to grow crops'], 2, 'Appoint là bổ nhiệm vào một vị trí. Được đào tạo hay sinh trong hoàng tộc không đồng nghĩa với được bổ nhiệm.'),
      q('What can be inferred about how the pharaoh governed?', ['Officials selected the ruler of each department themselves.', 'Farmers held the same religious authority as the ruler.', 'The army was the only institution with appointed officials.', 'The ruler assigned administrative work to other officials.'], 3, 'Pharaoh giữ nhiều vai trò, còn quan chức do nhà vua bổ nhiệm quản lý các cơ quan. Điều này cho thấy công việc hành chính được phân công cho người khác.')
    ]
  },
  {
    id: 'mesopotamia', group: 'reading', title: 'Mesopotamia', subtitle: 'Vùng đất giữa hai dòng sông', topic: 'Early civilizations', minutes: 18, art: 'rivers',
    description: 'Từ nước ngọt, nông nghiệp đến những thành bang đầu tiên.',
    sources: [{ file: unit1, section: 'Mesopotamia' }],
    reading: [
      'Mesopotamia lay in the Fertile Crescent, between the Tigris and Euphrates Rivers. Rainfall was often irregular, but the rivers provided freshwater for agriculture. These water sources made it possible for early communities to develop. The name Mesopotamia means the land between the rivers.',
      'By about 3500 BCE, cities had appeared in Sumer in southern Mesopotamia. Builders used mud bricks and wood brought from the Mediterranean coast. Sumerian cities had organized religions, centralized governments, social hierarchies, and trade networks. As leaders gained control of nearby territories, the cities became city-states.'
    ],
    readingSupport: [
      'Lưỡng Hà nằm trong vùng Lưỡi liềm Màu mỡ, giữa hai sông Tigris và Euphrates. Lượng mưa thường thất thường, nhưng các dòng sông cung cấp nước ngọt cho nông nghiệp. Những nguồn nước này tạo điều kiện cho các cộng đồng ban đầu phát triển. Tên Mesopotamia có nghĩa là vùng đất giữa các dòng sông.',
      'Đến khoảng năm 3500 trước Công nguyên, các thành phố đã xuất hiện ở Sumer, thuộc miền nam Lưỡng Hà. Người xây dựng dùng gạch bùn và gỗ được đưa đến từ bờ biển Địa Trung Hải. Các thành phố Sumer có tôn giáo được tổ chức, chính quyền tập trung, các tầng bậc xã hội và mạng lưới buôn bán. Khi các lãnh đạo giành quyền kiểm soát lãnh thổ lân cận, những thành phố này trở thành các thành bang.'
    ],
    vocabulary: [
      v('irregular', 'không đều; thất thường', 'adjective', 'Rainfall was irregular.'),
      v('freshwater', 'nước ngọt', 'noun', 'The rivers provided freshwater.'),
      v('agriculture', 'nông nghiệp', 'noun', 'Agriculture depended on water.'),
      v('mud brick', 'gạch bùn', 'noun phrase', 'Builders used mud bricks.'),
      v('trade network', 'mạng lưới buôn bán', 'noun phrase', 'Cities were linked by trade networks.'),
      v('city-state', 'thành bang', 'noun', 'Each city-state controlled nearby land.')
    ],
    enVi: tr('Rainfall was often irregular, but the rivers provided freshwater for agriculture.', 'Lượng mưa thường thất thường, nhưng các dòng sông cung cấp nước ngọt cho nông nghiệp.', ['but diễn tả sự tương phản.', 'for agriculture: phục vụ nông nghiệp.']),
    viEn: tr('Những người xây dựng sử dụng gạch bùn. Các thành phố của người Sumer có mạng lưới buôn bán.', 'Builders used mud bricks. Sumerian cities had trade networks.', ['Dùng thì quá khứ để mô tả xã hội cổ đại.', 'Sumerian là tính từ chỉ người/văn hóa Sumer.']),
    quiz: [
      q('Which pair of rivers is named in the passage?', ['The Nile and the Euphrates', 'The Tigris and the Euphrates', 'The Tigris and the Indus', 'The Indus and the Nile'], 1, 'Câu đầu xác định hai dòng sông là Tigris và Euphrates; các lựa chọn khác ghép nhầm tên sông.'),
      q('Why could agriculture develop despite irregular rainfall?', ['The rivers supplied freshwater for farming.', 'Mediterranean traders brought water to the fields.', 'City leaders made the rainy season more regular.', 'Mud-brick buildings stored all the water farmers needed.'], 0, 'Từ but nối lượng mưa thất thường với nguồn nước ngọt do sông cung cấp. Bài không nói thương nhân hay công trình tạo nguồn nước này.'),
      q('In this passage, “trade networks” are connections used to…', ['organize different cities under one religion', 'divide farmland among neighboring rulers', 'exchange goods between communities', 'link rivers through a system of canals'], 2, 'Trade networks là mạng lưới trao đổi hàng hóa. Tôn giáo, cai trị và thủy lợi là những khái niệm khác.'),
      q('How did the cities develop into city-states?', ['Builders imported more wood from the coast.', 'Farmers moved their fields away from the rivers.', 'Religious groups took control of Mediterranean ports.', 'City leaders extended their control over surrounding land.'], 3, 'Câu cuối nói lãnh đạo thành phố kiểm soát lãnh thổ lân cận, từ đó hình thành thành bang; nhập gỗ chỉ là chi tiết về xây dựng.')
    ]
  },
  {
    id: 'indus', group: 'reading', title: 'The Indus Civilization', subtitle: 'Từ nông nghiệp đến đô thị', topic: 'Early civilizations', minutes: 18, art: 'city',
    description: 'Tìm hiểu chuyên môn hóa, trao đổi và những thay đổi trong xã hội.',
    sources: [{ file: unit1, section: 'Ancient India' }],
    reading: [
      'The Indus Civilization developed cities, social classes, writing, and specialized crafts. Between about 2500 and 1900 BCE, communities took part in long-distance trade with regions including Mesopotamia and Central Asia. Its foundations reached back to an earlier transition from hunting and gathering to agriculture and pastoralism.',
      'Early in the second millennium BCE, Harappa and Mohenjo-daro were no longer functioning urban centers. The civilization came to an end as a complex social system. By about 1000 BCE, iron technology had become more widespread across the subcontinent. New beliefs associated with the Vedas also marked changes in the region.'
    ],
    readingSupport: [
      'Văn minh sông Ấn phát triển các thành phố, các tầng lớp xã hội, chữ viết và những nghề thủ công chuyên môn hóa. Trong khoảng từ năm 2500 đến năm 1900 trước Công nguyên, các cộng đồng tham gia buôn bán đường dài với nhiều vùng, trong đó có Lưỡng Hà và Trung Á. Nền tảng của nền văn minh này bắt nguồn từ sự chuyển đổi trước đó, từ săn bắt và hái lượm sang nông nghiệp và chăn nuôi gia súc.',
      'Đầu thiên niên kỷ thứ hai trước Công nguyên, Harappa và Mohenjo-daro không còn là những trung tâm đô thị hoạt động. Nền văn minh này chấm dứt tồn tại với tư cách một hệ thống xã hội phức tạp. Đến khoảng năm 1000 trước Công nguyên, công nghệ sắt đã phổ biến hơn trên tiểu lục địa. Những niềm tin mới gắn với kinh Veda cũng đánh dấu các thay đổi trong khu vực.'
    ],
    vocabulary: [
      v('specialized', 'chuyên biệt; chuyên môn hóa', 'adjective', 'Cities supported specialized crafts.'),
      v('long-distance trade', 'buôn bán đường dài', 'noun phrase', 'Merchants took part in long-distance trade.'),
      v('transition', 'sự chuyển đổi', 'noun', 'There was a transition to agriculture.'),
      v('pastoralism', 'hoạt động chăn nuôi gia súc', 'noun', 'People practiced agriculture and pastoralism.'),
      v('urban center', 'trung tâm đô thị', 'noun phrase', 'Harappa was an urban center.'),
      v('widespread', 'phổ biến; trên diện rộng', 'adjective', 'Iron technology became widespread.')
    ],
    enVi: tr('Its foundations reached back to an earlier transition from hunting and gathering to agriculture and pastoralism.', 'Nền tảng của nền văn minh này bắt nguồn từ sự chuyển đổi trước đó, từ săn bắt và hái lượm sang nông nghiệp và chăn nuôi.', ['from … to …: từ … sang …', 'Its thay cho the Indus Civilization’s.']),
    viEn: tr('Các cộng đồng tham gia buôn bán đường dài. Công nghệ sắt trở nên phổ biến hơn.', 'Communities took part in long-distance trade. Iron technology became more widespread.', ['take part in: tham gia; quá khứ là took part in.', 'became + tính từ: trở nên.']),
    quiz: [
      q('Which description best matches Indus society in the first paragraph?', ['Urban communities with writing, crafts, and long-distance trade', 'Farming communities whose trade was limited to nearby villages', 'Mobile hunting groups beginning to establish their first farms', 'Iron-producing communities founded after the urban centers declined'], 0, 'Đoạn 1 mô tả đô thị, chữ viết, nghề thủ công chuyên môn hóa và buôn bán đường dài. Các lựa chọn khác nhầm giai đoạn hoặc quy mô trao đổi.'),
      q('Which statement is supported by the second paragraph?', ['Harappa became an urban center around 1000 BCE.', 'The urban centers declined before iron became more widespread.', 'The Vedas marked the beginning of long-distance trade.', 'Iron technology disappeared when the cities stopped functioning.'], 1, 'Bài đặt sự suy giảm của các đô thị ở đầu thiên niên kỷ II TCN, trước mốc công nghệ sắt phổ biến hơn khoảng 1000 TCN.'),
      q('In “iron technology had become more widespread”, “widespread” means…', ['used by a smaller group of specialists', 'developed into a more complex technique', 'used across a larger geographical area', 'introduced at a much earlier date'], 2, 'Widespread nói về mức độ phổ biến trên diện rộng, không phải độ phức tạp hay thời điểm xuất hiện.'),
      q('What does “Its foundations” refer to in the first paragraph?', ['The construction materials used in Harappa', 'The beliefs that appeared with the Vedas', 'The iron technology used across the subcontinent', 'The earlier developments that supported the civilization'], 3, 'Foundations được dùng theo nghĩa nền tảng: sự chuyển sang nông nghiệp và chăn nuôi tạo cơ sở cho văn minh phát triển, không chỉ móng công trình.')
    ]
  },
  {
    id: 'china', group: 'reading', title: 'Ancient China', subtitle: 'Những dòng sông và Con đường Tơ lụa', topic: 'Early civilizations', minutes: 20, art: 'wall',
    description: 'Luyện đọc về canh tác, quyền lực và các tuyến trao đổi hàng hóa.',
    sources: [{ file: unit1, section: 'Ancient China' }],
    reading: [
      'Agricultural communities in ancient China developed in the Yellow and Yangtze river basins. Intensive cultivation and iron tools supported farming. Mountains, deserts, and oceans separated the region from many western societies. Over time, community leaders formed a ruling class.',
      'In 221 BCE, Zheng took the title of First Emperor and began the Qin dynasty. He ordered workers to connect a series of defensive walls. During the Han dynasty, the walls were extended to protect routes associated with the Silk Road. Merchants carried silk across mountains and deserts toward the Roman world, linking distant societies through trade.'
    ],
    readingSupport: [
      'Các cộng đồng nông nghiệp ở Trung Quốc cổ đại phát triển trong lưu vực sông Hoàng Hà và Trường Giang. Canh tác thâm canh và công cụ bằng sắt hỗ trợ hoạt động nông nghiệp. Núi, sa mạc và đại dương ngăn cách khu vực này với nhiều xã hội phương Tây. Theo thời gian, các lãnh đạo cộng đồng hình thành một tầng lớp thống trị.',
      'Năm 221 trước Công nguyên, Zheng lấy hiệu Hoàng đế đầu tiên và mở đầu triều Tần. Ông ra lệnh cho người lao động nối một loạt tường thành phòng thủ. Trong thời nhà Hán, các tường thành được kéo dài để bảo vệ những tuyến đường gắn với Con đường Tơ lụa. Thương nhân mang tơ lụa qua núi và sa mạc về phía thế giới La Mã, kết nối những xã hội xa nhau thông qua buôn bán.'
    ],
    vocabulary: [
      v('river basin', 'lưu vực sông', 'noun phrase', 'Farmers lived in river basins.'),
      v('cultivation', 'sự canh tác', 'noun', 'Iron tools supported intensive cultivation.'),
      v('ruling class', 'tầng lớp thống trị', 'noun phrase', 'Leaders formed a ruling class.'),
      v('dynasty', 'triều đại', 'noun', 'The Qin dynasty began in 221 BCE.'),
      v('defensive', 'mang tính phòng thủ', 'adjective', 'Workers connected defensive walls.'),
      v('merchant', 'thương nhân', 'noun', 'Merchants carried silk across deserts.')
    ],
    enVi: tr('Merchants carried silk across mountains and deserts, linking distant societies through trade.', 'Các thương nhân mang tơ lụa qua núi và sa mạc, kết nối những xã hội xa xôi thông qua buôn bán.', ['across: băng qua.', 'linking … bổ sung kết quả của việc vận chuyển và buôn bán.']),
    viEn: tr('Nông dân sống trong các lưu vực sông. Công nhân nối một loạt tường thành phòng thủ.', 'Farmers lived in river basins. Workers connected a series of defensive walls.', ['a series of + danh từ số nhiều: một loạt.', 'Có thể dùng joined thay cho connected.']),
    quiz: [
      q('Where does the passage place the development of agricultural communities?', ['In the mountain passes along the Silk Road', 'In the Yellow and Yangtze river basins', 'In the deserts separating China from the west', 'In the coastal ports of the Roman world'], 1, 'Đoạn 1 đặt các cộng đồng nông nghiệp ở lưu vực hai sông; núi và sa mạc được nhắc đến với vai trò địa lý khác.'),
      q('Why were walls extended during the Han dynasty, according to the passage?', ['To help protect routes connected with the Silk Road', 'To divide the two main river basins into separate kingdoms', 'To direct merchants toward newly built farming settlements', 'To separate the ruling class from agricultural communities'], 0, 'Đoạn 2 trực tiếp nêu mục đích bảo vệ các tuyến đường gắn với Con đường Tơ lụa.'),
      q('In this context, a “ruling class” is a group of people who…', ['carry goods between distant trading centers', 'work together to increase agricultural output', 'hold power over the rest of society', 'share the same place of birth'], 2, 'Ruling chỉ việc cai trị. Tầng lớp thống trị nắm quyền lực, không đồng nghĩa với nhóm thương nhân hay nông dân.'),
      q('What does the passage suggest about trade along the Silk Road?', ['It depended mainly on travel along the two rivers.', 'It developed only after the defensive walls disappeared.', 'It connected communities within a single farming region.', 'It linked societies despite major geographical barriers.'], 3, 'Thương nhân vượt núi và sa mạc để kết nối những xã hội xa nhau; điều này cho thấy buôn bán vượt qua trở ngại địa lý.')
    ]
  },
  {
    id: 'greece', group: 'reading', title: 'Greek City-states', subtitle: 'Nhiều thành bang, nhiều cách cai trị', topic: 'Early civilizations', minutes: 15, art: 'columns',
    description: 'Phân tích ý chính và quan hệ nguyên nhân trong một đoạn đọc ngắn.',
    sources: [{ file: unit1, section: 'Ancient Greece and Rome — phần văn bản về thành bang Hy Lạp' }],
    reading: [
      'City-states became common in Greece around 700 BCE. The Greek word for a city-state was polis. Most were small because geographic features, including mountains, limited their size. Athens and Sparta were among the largest, and their territories included plains surrounding the central city.',
      'Each city-state was independent. Its people developed the form of government they believed would work best for them. As a result, different city-states used different political systems. Some kept the same system for centuries, while others changed gradually from one form of government to another.'
    ],
    readingSupport: [
      'Các thành bang trở nên phổ biến ở Hy Lạp vào khoảng năm 700 trước Công nguyên. Từ tiếng Hy Lạp chỉ thành bang là polis. Phần lớn thành bang có quy mô nhỏ vì những đặc điểm địa lý, trong đó có núi, hạn chế kích thước của chúng. Athens và Sparta thuộc số các thành bang lớn nhất; lãnh thổ của họ bao gồm những đồng bằng xung quanh thành phố trung tâm.',
      'Mỗi thành bang đều độc lập. Người dân của từng thành bang phát triển hình thức chính quyền mà họ tin là phù hợp nhất với mình. Vì vậy, các thành bang khác nhau sử dụng những hệ thống chính trị khác nhau. Một số giữ nguyên hệ thống trong nhiều thế kỷ, trong khi những nơi khác thay đổi dần từ hình thức chính quyền này sang hình thức khác.'
    ],
    vocabulary: [
      v('geographic feature', 'đặc điểm địa lý', 'noun phrase', 'Mountains are geographic features.'),
      v('plain', 'đồng bằng', 'noun', 'Plains surrounded the city.'),
      v('independent', 'độc lập', 'adjective', 'Each city-state was independent.'),
      v('government', 'chính quyền; hình thức cai trị', 'noun', 'People chose a form of government.'),
      v('political system', 'hệ thống chính trị', 'noun phrase', 'City-states used different political systems.'),
      v('gradually', 'dần dần', 'adverb', 'Some systems changed gradually.')
    ],
    enVi: tr('Most city-states were small because geographic features, including mountains, limited their size.', 'Phần lớn các thành bang có quy mô nhỏ vì các đặc điểm địa lý, trong đó có núi, hạn chế kích thước của chúng.', ['because mở đầu nguyên nhân.', 'including: bao gồm; trong đó có.']),
    viEn: tr('Mỗi thành bang đều độc lập. Một số hệ thống chính trị thay đổi dần theo thời gian.', 'Each city-state was independent. Some political systems changed gradually over time.', ['Each + danh từ số ít.', 'gradually là trạng từ bổ nghĩa cho changed.']),
    quiz: [
      q('Which description best matches a “polis” in this passage?', ['An independent city and the territory it controlled', 'A province governed by a neighboring capital', 'A farming plain shared by several kingdoms', 'A council that governed all Greek cities'], 0, 'Polis là thành bang độc lập, gồm thành phố và vùng đất xung quanh; không phải một cơ quan cai trị toàn Hy Lạp.'),
      q('What limited the size of most Greek city-states?', ['The political systems used in Athens and Sparta', 'Geographic features such as mountains', 'The number of years a government remained in power', 'The decision to keep farmland outside their territories'], 1, 'Câu đầu của phần giải thích địa lý nói núi và các đặc điểm khác hạn chế quy mô thành bang.'),
      q('Which conclusion is supported by the second paragraph?', ['Larger city-states changed their governments more often.', 'Athens and Sparta selected political systems for smaller cities.', 'Independence allowed city-states to develop different governments.', 'City-states changed their political systems at the same rate.'], 2, 'Mỗi thành bang độc lập và tự phát triển cách cai trị, nên có nhiều hệ thống khác nhau. Bài không so sánh tốc độ thay đổi theo quy mô.'),
      q('In “changed gradually”, “gradually” means…', ['according to a fixed political rule', 'through decisions made by another city', 'at regular intervals of one century', 'in small stages over a period of time'], 3, 'Gradually là từng bước qua thời gian; không có nghĩa theo chu kỳ cố định hay do thành phố khác quyết định.')
    ]
  },
  {
    id: 'explorations', group: 'reading', title: 'An Age of Exploration', subtitle: 'Điều gì đưa con người ra khơi?', topic: 'Explorations & revolutions', minutes: 22, art: 'compass',
    description: 'Đọc về động lực khám phá và công nghệ hàng hải.',
    sources: [{ file: unit2, section: 'Geography Explorations', pages: '1–2 (trang PDF)' }],
    reading: [
      'European interest in exploration grew in the 1400s. Several motives encouraged sailors to travel farther. Countries wanted direct routes to Asian spices because existing trade routes made these goods expensive. Religion also encouraged some Europeans to travel, while stories of earlier journeys inspired curiosity about unfamiliar lands.',
      'Improvements in navigation and shipbuilding made longer voyages possible. Sailors used the compass and astrolabe to find their way. More accurate maps helped them cross open water instead of staying close to the coast. Portuguese shipbuilders developed caravels, and explorers established trading posts along new routes. In 1498, Vasco da Gama sailed around Africa and reached India.'
    ],
    readingSupport: [
      'Mối quan tâm của người châu Âu đối với việc thám hiểm gia tăng trong thế kỷ XV. Nhiều động lực khuyến khích thủy thủ đi xa hơn. Các nước muốn có những tuyến đường trực tiếp đến nguồn gia vị châu Á vì các tuyến buôn bán hiện có khiến những hàng hóa này đắt đỏ. Tôn giáo cũng thúc đẩy một số người châu Âu đi đến những nơi khác, trong khi các câu chuyện về những hành trình trước đó khơi gợi sự tò mò về những vùng đất xa lạ.',
      'Những cải tiến về định hướng hàng hải và đóng tàu giúp các chuyến đi biển dài hơn trở nên khả thi. Thủy thủ dùng la bàn và dụng cụ đo thiên thể astrolabe để tìm đường. Bản đồ chính xác hơn giúp họ vượt biển khơi thay vì ở sát bờ. Những người đóng tàu Bồ Đào Nha phát triển loại tàu caravel, và các nhà thám hiểm lập trạm buôn bán dọc những tuyến đường mới. Năm 1498, Vasco da Gama đi thuyền vòng quanh châu Phi và đến Ấn Độ.'
    ],
    vocabulary: [
      v('exploration', 'sự thám hiểm; khám phá', 'noun', 'Interest in exploration grew.'),
      v('trade route', 'tuyến đường buôn bán', 'noun phrase', 'Countries wanted direct trade routes.'),
      v('curiosity', 'sự tò mò', 'noun', 'Stories inspired curiosity about other lands.'),
      v('navigation', 'việc định hướng, dẫn đường', 'noun', 'Navigation improved with better tools.'),
      v('accurate', 'chính xác', 'adjective', 'Sailors used more accurate maps.'),
      v('voyage', 'chuyến đi đường biển', 'noun', 'New ships made longer voyages possible.')
    ],
    enVi: tr('More accurate maps helped sailors cross open water instead of staying close to the coast.', 'Những bản đồ chính xác hơn giúp thủy thủ vượt qua vùng biển khơi thay vì ở sát bờ biển.', ['instead of + V-ing: thay vì làm gì.', 'open water ở đây chỉ vùng nước xa bờ.']),
    viEn: tr('Những câu chuyện về các hành trình trước đó khơi dậy sự tò mò. Các công cụ mới giúp thủy thủ tìm đường.', 'Stories of earlier journeys inspired curiosity. New tools helped sailors find their way.', ['Có thể dùng sparked curiosity.', 'find their way: tìm đường; định hướng.']),
    quiz: [
      q('Why did countries want direct routes to Asian spices?', ['Existing routes made the spices difficult to grow in Europe.', 'Existing routes made the spices expensive to obtain.', 'New routes would allow sailors to stay closer to home.', 'New routes would remove the need for navigational tools.'], 1, 'Bài liên hệ tuyến buôn bán hiện có với giá gia vị cao; mục đích là tiếp cận nguồn hàng trực tiếp hơn, không phải trồng gia vị.'),
      q('What does the passage identify as helping sailors cross open water?', ['More accurate maps that reduced the need to follow the coast', 'Trading posts that supplied new religious ideas to sailors', 'Stories that described unfamiliar animals in distant countries', 'Spice prices that encouraged merchants to visit existing ports'], 0, 'Đoạn 2 nêu bản đồ chính xác giúp đi biển khơi. Các lựa chọn còn lại nhầm động lực khám phá với công cụ định hướng.'),
      q('How is the passage organized?', ['It compares two explorers and then describes their shared route.', 'It lists new ships and then explains why European trade declined.', 'It explains motives for exploration and then developments that enabled it.', 'It describes a voyage and then traces the origins of Asian spices.'], 2, 'Đoạn 1 trình bày lý do muốn khám phá; đoạn 2 giải thích công nghệ giúp thực hiện các hành trình.'),
      q('In this passage, “navigation” refers to…', ['building ships that can carry more cargo', 'buying and selling spices in overseas markets', 'recording stories about unfamiliar countries', 'finding and following a route during a journey'], 3, 'Navigation là định hướng, dẫn đường. Shipbuilding là đóng tàu, còn buôn bán và kể chuyện là hoạt động khác.')
    ]
  },
  {
    id: 'industrial', group: 'reading', title: 'The Industrial Revolution', subtitle: 'Khi máy móc thay đổi cách sản xuất', topic: 'Explorations & revolutions', minutes: 22, art: 'factory',
    description: 'Học ngôn ngữ về sản xuất, tài nguyên và sự thay đổi.',
    sources: [{ file: unit2, section: 'Industrial Revolution in England', pages: '2–3 (trang PDF)' }],
    reading: [
      'The Industrial Revolution began in England in the middle of the eighteenth century. Production shifted from work done by hand toward machine-made goods. Changes in agriculture also affected workers. Large landowners enclosed fields and experimented with new methods. Some small farmers became tenant farmers, while others moved to cities.',
      'Britain had workers, natural resources, overseas trade, and an economy that could support industrial development. Land, labor, and capital were important factors of production. In the textile industry, new spinning and weaving machines increased output. Improvements to steam engines made them more efficient and reduced the amount of fuel needed.'
    ],
    readingSupport: [
      'Cuộc Cách mạng Công nghiệp bắt đầu ở Anh vào giữa thế kỷ XVIII. Sản xuất chuyển từ công việc làm bằng tay sang hàng hóa được làm bằng máy. Những thay đổi trong nông nghiệp cũng ảnh hưởng đến người lao động. Các chủ đất lớn rào kín đồng ruộng và thử nghiệm những phương pháp mới. Một số nông dân quy mô nhỏ trở thành nông dân thuê đất, trong khi những người khác chuyển đến thành phố.',
      'Nước Anh (Britain) có người lao động, tài nguyên thiên nhiên, thương mại với nước ngoài và một nền kinh tế có thể hỗ trợ phát triển công nghiệp. Đất đai, lao động và vốn là những yếu tố sản xuất quan trọng. Trong ngành dệt, các máy kéo sợi và máy dệt mới làm tăng sản lượng. Những cải tiến đối với động cơ hơi nước giúp chúng hoạt động hiệu quả hơn và giảm lượng nhiên liệu cần dùng.'
    ],
    vocabulary: [
      v('machine-made', 'được sản xuất bằng máy', 'adjective', 'Factories produced machine-made goods.'),
      v('enclose', 'rào kín; bao lại', 'verb', 'Landowners enclosed fields.'),
      v('tenant farmer', 'nông dân thuê đất', 'noun phrase', 'Some people became tenant farmers.'),
      v('capital', 'vốn', 'noun', 'Production needed land, labor, and capital.'),
      v('output', 'sản lượng', 'noun', 'New machines increased output.'),
      v('efficient', 'hiệu quả; ít lãng phí nguồn lực', 'adjective', 'Improved engines were more efficient.')
    ],
    enVi: tr('New spinning and weaving machines increased output. Improvements to steam engines reduced the amount of fuel needed.', 'Các máy kéo sợi và dệt mới làm tăng sản lượng. Những cải tiến ở động cơ hơi nước làm giảm lượng nhiên liệu cần dùng.', ['output ở đây là sản lượng.', 'the amount of + danh từ không đếm được.']),
    viEn: tr('Một số nông dân chuyển đến thành phố. Đất đai, lao động và vốn là những yếu tố sản xuất quan trọng.', 'Some farmers moved to cities. Land, labor, and capital were important factors of production.', ['Có thể viết labour theo Anh–Anh.', 'factors of production: các yếu tố sản xuất.']),
    quiz: [
      q('Which change is central to the Industrial Revolution described here?', ['Moving production from cities back to small village farms', 'Shifting production from handwork toward machine-made goods', 'Replacing overseas trade with the exchange of local crops', 'Dividing large enclosed fields into smaller family farms'], 1, 'Câu đầu xác định sự chuyển từ làm bằng tay sang sản xuất bằng máy; các lựa chọn khác đảo chiều hoặc đổi chủ đề.'),
      q('How does the passage connect agricultural change with urban life?', ['Some small farmers moved to cities after changes in land ownership.', 'Overseas merchants bought enclosed fields to build new cities.', 'Textile machines allowed city workers to become landowners.', 'Steam engines made it unnecessary for people to live in cities.'], 0, 'Đoạn 1 nói việc rào đất và thay đổi canh tác khiến một số nông dân trở thành người thuê đất hoặc chuyển lên thành phố.'),
      q('Which result of improvements to steam engines is stated?', ['They required a larger supply of fuel to operate.', 'They shifted textile work from machines back to handwork.', 'They operated more efficiently while using less fuel.', 'They reduced the need for trade with overseas markets.'], 2, 'Bài nêu rõ động cơ hiệu quả hơn và giảm lượng nhiên liệu cần dùng; không gắn cải tiến này với giảm ngoại thương.'),
      q('In “new spinning and weaving machines increased output”, “output” means…', ['the amount of money invested in production', 'the number of people employed in farming', 'the amount of fuel supplied to an engine', 'the amount of goods produced'], 3, 'Output là sản lượng. Vốn đầu tư, số lao động và nhiên liệu là đầu vào hoặc nguồn lực, không phải sản phẩm tạo ra.')
    ]
  },
  {
    id: 'vietnam', group: 'reading', title: 'Early Vietnam', subtitle: 'Nguồn gốc và những bước đầu độc lập', topic: 'History of Vietnam', minutes: 20, art: 'vietnam',
    description: 'Luyện phân biệt truyền thuyết và tường thuật lịch sử bằng tiếng Anh.',
    sources: [{ file: vietnam, section: 'Origins; Early Independence — các đoạn được chọn', pages: '1–2 (trang PDF)' }],
    reading: [
      'Vietnamese myths describe Lac Long Quan and Au Co as the ancestors of the Vietnamese people. Stories of the Hung kings connect them with Van Lang and the Lac Viet people. These accounts belong to a tradition of origin myths. They should be read as traditional narratives rather than treated in the same way as dated historical events.',
      'The source also describes resistance during periods of Chinese rule. In AD 40, the Trung Sisters led a movement for independence and established their capital at Me Linh. Much later, Ngo Quyen won the Battle of Bach Dang in 938. Following this victory, a period of independence began. Dinh Bo Linh later ended a struggle among rival warlords and established his capital at Hoa Lu.'
    ],
    readingSupport: [
      'Truyền thuyết Việt Nam kể rằng Lạc Long Quân và Âu Cơ là tổ tiên của người Việt. Các câu chuyện về các vua Hùng gắn những vị vua này với Văn Lang và người Lạc Việt. Những câu chuyện này thuộc dòng truyền thuyết về nguồn gốc. Chúng nên được đọc như những câu chuyện truyền thống, thay vì được xem giống hệt các sự kiện lịch sử có niên đại xác định.',
      'Tài liệu cũng mô tả sự kháng cự trong các thời kỳ bị Trung Quốc cai trị. Năm 40 Công nguyên, Hai Bà Trưng lãnh đạo một phong trào giành độc lập và đặt kinh đô tại Mê Linh. Rất lâu sau đó, Ngô Quyền thắng trận Bạch Đằng năm 938. Sau chiến thắng này, một thời kỳ độc lập bắt đầu. Tiếp đó, Đinh Bộ Lĩnh chấm dứt cuộc tranh giành giữa các thế lực quân sự đối địch và đặt kinh đô tại Hoa Lư.'
    ],
    vocabulary: [
      v('ancestor', 'tổ tiên', 'noun', 'The myths describe the ancestors of a people.'),
      v('origin myth', 'truyền thuyết về nguồn gốc', 'noun phrase', 'An origin myth is a traditional narrative.'),
      v('resistance', 'sự kháng cự; phong trào chống lại', 'noun', 'The source describes resistance to foreign rule.'),
      v('independence', 'nền độc lập', 'noun', 'The movement sought independence.'),
      v('establish', 'thiết lập; thành lập', 'verb', 'They established a capital.'),
      v('rival', 'đối địch; cạnh tranh', 'adjective', 'Rival warlords struggled for power.')
    ],
    enVi: tr('These accounts belong to a tradition of origin myths. They should be read as traditional narratives.', 'Những câu chuyện này thuộc dòng truyền thuyết về nguồn gốc. Chúng nên được đọc như những câu chuyện truyền thống.', ['accounts ở đây nghĩa là các câu chuyện/tường thuật.', 'should be read: cấu trúc bị động với should.']),
    viEn: tr('Hai Bà Trưng lãnh đạo một phong trào giành độc lập. Ngô Quyền giành chiến thắng trong trận Bạch Đằng năm 938.', 'The Trung Sisters led a movement for independence. Ngo Quyen won the Battle of Bach Dang in 938.', ['lead → led; win → won.', 'Có thể giữ dấu tiếng Việt trong tên riêng.']),
    quiz: [
      q('Why does the first paragraph call the accounts “origin myths”?', ['They record the dates of battles in the same way as military reports.', 'They are traditional stories explaining a people’s beginnings.', 'They list the rulers who governed from the capital at Hoa Lu.', 'They explain how foreign officials recorded local resistance.'], 1, 'Origin myths là truyện truyền thống giải thích nguồn gốc, được phân biệt với tường thuật sự kiện có niên đại.'),
      q('Which leader–capital pairing is supported by the passage?', ['The Trung Sisters — Me Linh', 'The Trung Sisters — Hoa Lu', 'Dinh Bo Linh — Me Linh', 'Ngo Quyen — Van Lang'], 0, 'Bài gắn Hai Bà Trưng với Mê Linh và Đinh Bộ Lĩnh với Hoa Lư; không nêu Vạn Lang là kinh đô của Ngô Quyền.'),
      q('Which event does the passage place between the Trung Sisters’ movement and Dinh Bo Linh’s rule?', ['The origin story of Lac Long Quan and Au Co', 'The formation of the first community of Lac Viet people', 'Ngo Quyen’s victory at the Battle of Bach Dang', 'The establishment of the Trung Sisters’ capital at Me Linh'], 2, 'Phong trào Hai Bà Trưng được ghi năm 40, chiến thắng của Ngô Quyền năm 938 và việc Đinh Bộ Lĩnh thống nhất các thế lực diễn ra sau đó.'),
      q('In “a struggle among rival warlords”, “rival” describes warlords who…', ['inherited the same position from one ruler', 'represented neighboring regions in a shared government', 'served as officials under the same military leader', 'competed against one another for power'], 3, 'Rival chỉ các bên cạnh tranh hoặc đối địch. Cụm struggle among củng cố nghĩa tranh giành quyền lực.')
    ]
  },
  {
    id: 'textbook-map', group: 'textbook', title: 'The Anatomy of a Chapter', subtitle: 'Đọc bản đồ của một chương sách', topic: 'Textbook structure', minutes: 16, art: 'book',
    description: 'Nhận diện câu hỏi định hướng, thuật ngữ và dòng thời gian.',
    sources: [{ file: mac, pages: '1–3 (trang PDF; trang in 177–179)', section: 'Chapter 6: Inquiry questions, History skills, Key terms, Timeline' }],
    reading: [
      'A chapter is a major division of a textbook. Different features within it help readers prepare for the topic. In the Macmillan chapter on Ancient China, inquiry questions introduce issues to investigate, while the history skills list identifies abilities students will practise. The introduction gives background to the topic.',
      'The key terms section explains important concepts. A timeline of key dates arranges events in chronological order. Before reading the main text, you can use these features to identify the chapter’s questions, preview its vocabulary, and place events in time. Each feature supports a different part of the learning process.'
    ],
    readingSupport: [
      'Chapter là một chương sách. Trong ví dụ Macmillan, inquiry questions định hướng vấn đề tìm hiểu; history skills nêu những kỹ năng cần luyện; introduction cung cấp bối cảnh.',
      'Key terms giải thích thuật ngữ trọng tâm, còn timeline sắp xếp sự kiện theo thời gian. Đọc lướt các mục này giúp xác định câu hỏi, chuẩn bị từ vựng và hiểu trình tự sự kiện trước khi đọc nội dung chính.'
    ],
    vocabulary: [
      v('chapter', 'chương', 'Cấu trúc sách', 'Chapter 6 introduces Ancient China.', 'Đơn vị nội dung lớn; ví dụ tiêu đề Chapter 6 ở trang PDF 1.'),
      v('inquiry question', 'câu hỏi định hướng tìm hiểu', 'Thành phần mở đầu', 'An inquiry question guides investigation.', 'Định hướng việc tìm hiểu; ví dụ các câu hỏi đầu chương ở trang PDF 1.'),
      v('history skills', 'các kỹ năng lịch sử', 'Mục tiêu kỹ năng', 'The history skills include using evidence.', 'Cho biết kỹ năng cần rèn; danh sách ở trang PDF 1.'),
      v('key terms', 'các thuật ngữ trọng tâm', 'Hỗ trợ từ vựng', 'Key terms explain important concepts.', 'Giải nghĩa thuật ngữ đầu chương; trang PDF 2.'),
      v('timeline', 'dòng thời gian', 'Tổ chức thông tin', 'A timeline orders events by date.', 'Sắp xếp các mốc theo thời gian; trang PDF 3.'),
      v('introduction', 'phần giới thiệu', 'Thành phần mở đầu', 'The introduction presents the topic.', 'Cung cấp bối cảnh trước các mục chi tiết; trang PDF 2.')
    ],
    quiz: [
      q('You want to know which issues a chapter will investigate. Which feature should you consult?', ['Inquiry questions', 'Key terms', 'Timeline of key dates', 'History skills'], 0, 'Inquiry questions nêu vấn đề cần tìm hiểu. Key terms giải nghĩa từ, timeline sắp xếp mốc thời gian, còn history skills nêu kỹ năng.'),
      q('Which feature would help you decide whether one event happened before another?', ['The introduction', 'The timeline', 'The key terms section', 'The skills list'], 1, 'Timeline tổ chức sự kiện theo trình tự thời gian, nên phù hợp để so sánh trước–sau.'),
      q('What is the main purpose of the key terms section?', ['To outline the questions students will investigate', 'To explain the sequence of major historical events', 'To explain important words and concepts in the chapter', 'To identify the skills students will practise'], 2, 'Key terms giải thích từ và khái niệm. Ba chức năng còn lại lần lượt thuộc inquiry questions, timeline và history skills.'),
      q('A student wants to check whether the chapter involves evaluating sources. Which feature is most relevant?', ['The timeline of key dates', 'The list of key terms', 'The chapter introduction', 'The history skills list'], 3, 'Đánh giá nguồn là kỹ năng cần vận dụng. Trong ví dụ Macmillan, History skills có các mục liên quan đến tìm, sử dụng và xem xét giá trị nguồn.')
    ]
  },
  {
    id: 'reading-features', group: 'textbook', title: 'Tools for Better Reading', subtitle: 'Những chỉ dẫn nằm quanh bài đọc', topic: 'Textbook features', minutes: 18, art: 'notes',
    description: 'Phân biệt từ vựng nội dung, từ vựng học thuật và chiến lược đọc.',
    sources: [{ file: mcg, pages: '1–2, 10 (trang PDF; trang in 294–295, 303)', section: 'Content Vocabulary, Academic Vocabulary, Reading Strategy, Reading Connection, Reading Summary' }],
    reading: [
      'Textbooks often include features that guide readers through a section. In the Glencoe section on the Qin and Han dynasties, content vocabulary introduces topic-specific language, such as acupuncture. Academic vocabulary includes words used in learning, such as currency and civil. A reading strategy asks students to complete a cause-and-effect diagram linking inventions to changes in society.',
      'A reading connection invites students to imagine their city without roads before reading about roads and canals in China. It connects familiar experience with a new topic. At the end of the section, a reading summary reviews the main points. A vocabulary list explains words, a reading strategy guides how to process information, and a summary helps readers review ideas.'
    ],
    readingSupport: [
      'Content vocabulary là từ gắn với chuyên đề, ví dụ acupuncture. Academic vocabulary là từ dùng trong học tập; sách xếp currency và civil vào nhóm này. Reading strategy hướng dẫn dùng sơ đồ nguyên nhân–kết quả để nối phát minh với thay đổi xã hội.',
      'Reading connection liên hệ trải nghiệm quen thuộc về đường sá với chủ đề mới. Reading summary ôn lại ý chính. Hãy phân biệt công cụ giải nghĩa từ, công cụ xử lý thông tin và công cụ ôn tập.'
    ],
    vocabulary: [
      v('content vocabulary', 'từ vựng chuyên biệt của nội dung', 'Hỗ trợ từ vựng', 'Acupuncture is listed as content vocabulary.', 'Nêu từ gắn với chuyên đề; acupuncture xuất hiện ở trang PDF 1.'),
      v('academic vocabulary', 'từ vựng học thuật', 'Hỗ trợ từ vựng', 'Currency and civil appear under academic vocabulary.', 'Nêu từ dùng trong học tập; ví dụ currency, civil, found, secure ở trang PDF 1.'),
      v('reading strategy', 'chiến lược đọc', 'Hỗ trợ đọc hiểu', 'The reading strategy uses a cause-and-effect diagram.', 'Hướng dẫn cách xử lý thông tin; sơ đồ invention/effect ở trang PDF 1.'),
      v('cause and effect', 'nguyên nhân và kết quả', 'Tổ chức thông tin', 'Link an invention to its effect.', 'Giúp nhận ra quan hệ giữa sự thay đổi và tác động; trang PDF 1.'),
      v('reading connection', 'liên hệ trước khi đọc', 'Kích hoạt hiểu biết', 'The reading connection asks about roads.', 'Liên hệ trải nghiệm người học với nội dung mới; trang PDF 2.'),
      v('reading summary', 'tóm tắt bài đọc', 'Ôn tập', 'The reading summary reviews the main points.', 'Nhắc lại ý chính sau bài; trang PDF 10.')
    ],
    quiz: [
      q('Which classification matches the vocabulary lists described in the passage?', ['Acupuncture: content vocabulary; currency: academic vocabulary', 'Acupuncture: academic vocabulary; currency: content vocabulary', 'Acupuncture and currency: both content vocabulary', 'Acupuncture and currency: both academic vocabulary'], 0, 'Ví dụ Glencoe xếp acupuncture vào Content Vocabulary và currency vào Academic Vocabulary. Câu hỏi yêu cầu đọc đúng cách phân loại trong tài liệu.'),
      q('What relationship does the Invention → Effect diagram help students identify?', ['The order in which different dynasties ruled', 'The link between a development and its consequences', 'The difference between a word and its pronunciation', 'The location of one trading center relative to another'], 1, 'Invention → Effect thể hiện phát minh và tác động của nó: quan hệ nguyên nhân–kết quả. Các lựa chọn khác thuộc dòng thời gian, từ vựng hoặc bản đồ.'),
      q('Why does the reading connection ask students to imagine a city without roads?', ['To test whether they remember the section’s key vocabulary', 'To summarize the achievements described at the end of the section', 'To connect their experience with the topic they are about to read', 'To arrange the construction of roads and canals chronologically'], 2, 'Câu hỏi khơi gợi trải nghiệm quen thuộc trước khi đọc về đường sá. Đây là liên hệ trước bài, không phải tóm tắt sau bài.'),
      q('You have finished the section and want a short review of its main ideas. Which feature best serves this purpose?', ['Content Vocabulary', 'Reading Connection', 'Academic Vocabulary', 'Reading Summary'], 3, 'Reading Summary nhắc lại ý chính. Hai mục vocabulary tập trung vào từ; Reading Connection nối trải nghiệm với chủ đề trước khi đọc.')
    ]
  },
  {
    id: 'lesson-plan', group: 'textbook', title: 'Inside a Lesson Plan', subtitle: 'Một tiết học được thiết kế thế nào?', topic: 'Pedagogical features', minutes: 18, art: 'plan',
    description: 'Hiểu mục tiêu, khởi động, hoạt động và đánh giá trong giáo án.',
    sources: [{ file: '2/Lesson plan_Egypt.docx', section: 'Lessons 1–2; Lessons 3–6: Timeline; Lessons 7–8: Social Hierarchy' }],
    reading: [
      'A lesson plan connects learning goals with classroom activities and assessment. In the Egypt plan, a learning outcome describes what students should achieve. SWBAT means Students Will Be Able To and introduces specific abilities, such as locating ancient Egypt on a world map. A hook attracts attention at the beginning of a lesson; the introductory lesson uses a guessing game.',
      'The materials section lists resources such as maps and pencils. Assessment identifies how the teacher will check learning: in the geography lesson, the teacher checks the accuracy of a labeled map. Closure brings the lesson to an end; in the introductory lesson, students share things they want to learn. These are features of lesson planning, rather than compulsory headings in every textbook.'
    ],
    readingSupport: [
      'Giáo án nối mục tiêu với hoạt động và đánh giá. Learning outcome nêu kết quả cần đạt; SWBAT là Students Will Be Able To, chẳng hạn xác định Ai Cập trên bản đồ. Hook là hoạt động khởi động tạo chú ý.',
      'Materials liệt kê học liệu, assessment nêu cách kiểm tra việc học, còn closure khép lại tiết học. Ví dụ, giáo viên kiểm tra độ chính xác của bản đồ đã ghi nhãn. Đây là thành phần giáo án, không phải các nhãn bắt buộc của mọi sách giáo khoa.'
    ],
    vocabulary: [
      v('learning outcome', 'kết quả học tập mong đợi', 'Mục tiêu', 'A learning outcome describes what students will achieve.', 'Cho biết đích của bài học; ví dụ phần mở đầu Lesson 1.'),
      v('SWBAT', 'Students Will Be Able To — học sinh sẽ có thể', 'Mục tiêu', 'SWBAT: Locate ancient Egypt on a world map.', 'Viết mục tiêu dưới dạng khả năng cụ thể; ví dụ Lesson 2: Geography.'),
      v('hook', 'hoạt động mở đầu thu hút chú ý', 'Hoạt động', 'The hook is a guessing game.', 'Khơi gợi hứng thú; Lesson 1 dùng trò chơi 20 Questions.'),
      v('materials', 'học liệu và vật dụng', 'Chuẩn bị', 'Materials include maps and pencils.', 'Liệt kê những thứ cần chuẩn bị; Lesson 2 có bản đồ, bút và keo.'),
      v('assessment', 'đánh giá', 'Theo dõi học tập', 'A labeled map provides evidence for assessment.', 'Kiểm tra việc đạt mục tiêu; Lesson 2 đánh giá bản đồ đã ghi nhãn.'),
      v('closure', 'hoạt động kết thúc bài', 'Hoạt động', 'Closure gives students time to share questions.', 'Khép lại và nhìn lại bài; Lesson 1 chia sẻ điều muốn biết thêm.')
    ],
    quiz: [
      q('Which statement expresses a learning outcome in the form introduced by SWBAT?', ['Students will be able to locate ancient Egypt on a world map.', 'Students will work in pairs while labeling their maps.', 'The teacher will distribute maps and colored pencils.', 'The class will begin with a game about ancient Egypt.'], 0, 'Learning outcome nêu khả năng người học đạt được. Làm việc theo cặp là cách tổ chức; phát bản đồ là bước chuẩn bị; chơi trò chơi là hoạt động mở đầu.'),
      q('A teacher begins a lesson with a guessing game to attract interest. What is the game functioning as?', ['An assessment of the final map', 'A hook for the new topic', 'A list of required materials', 'A closure activity for review'], 1, 'Theo mô tả, mục đích và thời điểm của trò chơi là tạo hứng thú đầu bài, nên nó là hook.'),
      q('Which action best matches the assessment described in the geography lesson?', ['Providing a blank map before the main activity', 'Listing the places that students will study', 'Checking whether places are correctly labeled on a map', 'Asking students what they hope to learn next'], 2, 'Assessment thu thập và xem xét bằng chứng học tập: ở đây là độ chính xác của nhãn bản đồ. Phát bản đồ chỉ là chuẩn bị.'),
      q('Where would a teacher list the maps, pencils, and other resources needed for the lesson?', ['Under Learning Outcome', 'Under Closure', 'Under Assessment', 'Under Materials'], 3, 'Materials liệt kê học liệu và vật dụng. Mục tiêu nêu khả năng đạt được, closure khép lại bài và assessment nêu cách kiểm tra.')
    ]
  },
  {
    id: 'kwl', group: 'textbook', title: 'The KWL Reading Strategy', subtitle: 'Đọc có mục đích với bảng KWL', topic: 'Learning strategies', minutes: 16, art: 'kwl',
    description: 'Đi từ điều đã biết đến câu hỏi và điều rút ra sau khi đọc.',
    sources: [{ file: '2/kwl_chart.pdf', pages: '1–3 (trang PDF)', section: 'Purpose of KWL Charts; Explicitly teaching KWL; KWL Example' }],
    reading: [
      'A KWL chart is a learning strategy and a tool for organizing ideas. Its columns are K: What I Know, W: What I Want to know, and L: What I Learned. Before reading, students brainstorm their prior knowledge in the K column. They use the W column to record questions they want the text to answer, giving them a purpose for reading.',
      'During reading, students look for answers and check what they thought they knew. After reading, they record what they learned in L and review which W questions were answered. A heading introduces a section, while a subheading identifies a smaller section within it. Turning either into a question can guide reading. Completing the chart helps students reflect on how their understanding has changed.'
    ],
    readingSupport: [
      'KWL là chiến lược học và công cụ tổ chức ý tưởng. K = What I Know (điều đã biết); W = What I Want to know (điều muốn biết); L = What I Learned (điều đã học được). Trước khi đọc, ghi kiến thức có sẵn vào K và câu hỏi cần tìm hiểu vào W.',
      'Trong lúc đọc, tìm câu trả lời và kiểm chứng hiểu biết cũ. Sau khi đọc, ghi kết quả vào L và đối chiếu câu hỏi W. Heading là tiêu đề mục, subheading là tiêu đề mục nhỏ; biến chúng thành câu hỏi giúp định hướng việc đọc và nhìn lại điều đã học.'
    ],
    vocabulary: [
      v('prior knowledge', 'kiến thức có sẵn', 'Chiến lược học', 'Activate prior knowledge before reading.', 'Kích hoạt điều đã biết trước bài; trang PDF 1, Step 2.'),
      v('brainstorm', 'động não; cùng nêu ý tưởng', 'Hoạt động', 'Brainstorm ideas for the K column.', 'Thu thập ý tưởng ban đầu; trang PDF 1, Step 2.'),
      v('purpose for reading', 'mục đích đọc', 'Chiến lược học', 'Questions create a purpose for reading.', 'Cột W giúp xác định mình đang tìm điều gì; trang PDF 1, Step 3.'),
      v('heading', 'tiêu đề mục', 'Cấu trúc văn bản', 'Turn a heading into a question.', 'Định hướng nội dung của mục; được nhắc ở trang PDF 1, Step 3.'),
      v('subheading', 'tiêu đề mục nhỏ', 'Cấu trúc văn bản', 'A subheading introduces a smaller section.', 'Chia nhỏ nội dung; có thể dùng tạo câu hỏi W, trang PDF 1–2.'),
      v('reflect', 'suy ngẫm; nhìn lại việc học', 'Chiến lược học', 'Reflect on what you learned.', 'Nhìn lại hiểu biết và câu hỏi sau khi đọc; phần Purpose, trang PDF 1.')
    ],
    quiz: [
      q('Before reading, a student asks, “How did the Nile help farmers?” Where should this question go?', ['In W, because it identifies something the student wants to learn', 'In K, because it records something the student already knows', 'In L, because it summarizes an answer learned from the text', 'In K, because it lists the section’s unfamiliar vocabulary'], 0, 'Câu hỏi chưa có đáp án thuộc W: What I Want to know. K ghi hiểu biết có sẵn, L ghi điều rút ra sau khi học.'),
      q('Which entry belongs in the L column after reading?', ['I think the chapter may discuss farming.', 'I learned that annual floods deposited fertile soil.', 'I want to know how farmers used the river.', 'Before reading, I already knew the name of the river.'], 1, 'L là What I Learned: điều đã học được từ bài. Các lựa chọn còn lại là dự đoán, câu hỏi cần tìm hiểu và kiến thức có sẵn.'),
      q('Why might a reader turn a subheading into a question?', ['To record an answer before checking the text', 'To replace a section’s main ideas with its title', 'To identify information to look for while reading', 'To arrange all unfamiliar words in alphabetical order'], 2, 'Câu hỏi từ subheading tạo mục đích đọc và giúp tìm thông tin. Nó chưa phải đáp án và không thay thế nội dung bài.'),
      q('Which sequence best follows the KWL strategy in the passage?', ['Record new learning → list prior knowledge → generate questions', 'Generate questions → summarize the text → list prior knowledge', 'Read the text → record prior knowledge → choose a purpose', 'Activate prior knowledge → set questions → read → reflect on learning'], 3, 'Quy trình là kích hoạt kiến thức cũ (K), đặt câu hỏi (W), đọc để tìm/kiểm chứng thông tin, rồi nhìn lại điều học được (L).')
    ]
  },
  {
    id: 'jigsaw', group: 'textbook', title: 'Learning, Piece by Piece', subtitle: 'Hiểu phương pháp mảnh ghép', topic: 'Learning strategies', minutes: 16, art: 'jigsaw',
    description: 'Nhóm gốc, nhóm chuyên gia và việc học qua chia sẻ kiến thức.',
    sources: [{ file: '2/FABJigsaw_Tipsheet.pdf', pages: '1 (trang PDF)', section: 'What is it?; How do I do it?; Why use it?' }],
    reading: [
      'Jigsaw is a cooperative learning technique in which students learn different parts of a topic and teach one another. Students begin in a home group. They then meet in expert groups, where each group studies an assigned concept, framework, or theory. Members work together to master their part and plan how to explain it to others.',
      'Students report back to their home groups and explain what they learned. The home group discusses how the different parts connect to form a whole. This process involves peer teaching: students help one another understand the material. Jigsaw is a way of organizing a learning activity, not a fixed structural part of a textbook.'
    ],
    readingSupport: [
      'Jigsaw là kỹ thuật học hợp tác: học từng phần rồi hướng dẫn lẫn nhau. Home group là nhóm gốc; expert group là nhóm chuyên gia cùng nghiên cứu một khái niệm hoặc phần nội dung và chuẩn bị cách giải thích.',
      'Sau đó, học sinh trở về nhóm gốc để trình bày lại (report back) và kết nối các phần. Peer teaching là học sinh dạy hoặc giúp bạn hiểu bài. Jigsaw là cách tổ chức hoạt động, không phải thành phần cấu trúc cố định của sách.'
    ],
    vocabulary: [
      v('cooperative learning', 'học hợp tác', 'Phương pháp', 'Jigsaw supports cooperative learning.', 'Người học phối hợp để hiểu nội dung; phần What is it?, trang PDF 1.'),
      v('home group', 'nhóm gốc', 'Tổ chức nhóm', 'Students return to their home group.', 'Nhóm ban đầu để tổng hợp các phần; bước 1–3, trang PDF 1.'),
      v('expert group', 'nhóm chuyên gia', 'Tổ chức nhóm', 'Each expert group studies one concept.', 'Nhóm tìm hiểu sâu một phần; bước 1, trang PDF 1.'),
      v('peer teaching', 'dạy và hướng dẫn lẫn nhau', 'Hoạt động', 'Peer teaching helps students explain ideas.', 'Học sinh chia sẻ hiểu biết với bạn; phần Why use it?, trang PDF 1.'),
      v('concept', 'khái niệm', 'Nội dung học', 'An expert group masters one concept.', 'Phần kiến thức được giao để nắm vững; bước 1, trang PDF 1.'),
      v('report back', 'trình bày lại; báo cáo lại', 'Hoạt động', 'Report back to the home group.', 'Truyền đạt phần đã tìm hiểu cho nhóm gốc; bước 2, trang PDF 1.')
    ],
    quiz: [
      q('What is the main task of an expert group in a Jigsaw activity?', ['To master an assigned part and prepare to explain it', 'To combine all the parts taught by the home group', 'To evaluate a presentation made by the teacher', 'To summarize the entire topic before studying individual parts'], 0, 'Expert group nghiên cứu sâu phần được giao và chuẩn bị cách giải thích. Tổng hợp các phần thành bức tranh chung diễn ra ở nhóm gốc sau đó.'),
      q('After working in expert groups, what do students do next?', ['They exchange assigned topics with another expert group.', 'They return to their home groups and explain their part.', 'They present their home groups’ conclusions to their expert groups.', 'They study the entire topic individually before sharing their part.'], 1, 'Bước Report back yêu cầu trở về home group để giải thích phần đã nghiên cứu; các phương án khác nhầm hướng chia sẻ hoặc thêm bước không có trong quy trình.'),
      q('Which example best illustrates peer teaching?', ['A teacher demonstrates how to label a map.', 'A student checks an answer against a model response.', 'A student explains a concept to classmates and answers their questions.', 'A group listens to a lecture and records the teacher’s key points.'], 2, 'Peer teaching là người học giúp người học khác hiểu kiến thức. Tự đối chiếu là tự học; nghe giảng là tiếp nhận hướng dẫn của giáo viên.'),
      q('Why does the home group discuss the different parts after students report back?', ['To choose which single part the whole group should study', 'To repeat the expert-group task with the same assigned concept', 'To organize students into new groups before the first explanation', 'To understand how the separate contributions fit into the whole topic'], 3, 'Bước thảo luận nối các mảnh kiến thức để thấy bức tranh chung; không phải chỉ chọn một phần hoặc lặp lại phần việc chuyên gia.')
    ]
  },
  {
    id: 'flipped', group: 'textbook', title: 'The Flipped Classroom', subtitle: 'Đổi cách dùng thời gian trên lớp', topic: 'Pedagogical features', minutes: 18, art: 'flipped',
    description: 'Học thuật ngữ về video trước giờ học và hỗ trợ trực tiếp trên lớp.',
    sources: [{ file: '2/The Flipped Classroom.pdf', pages: '1–3 (trang PDF; trang in 24–26)', section: 'Flipped Class 101; Benefits; Common Questions' }],
    reading: [
      'In the basic flipped classroom described by Bergmann and Sams, students encounter direct instruction through video before class. Practice and application that might traditionally be homework take place in class, where a teacher can help. The central question is how to make the best use of face-to-face class time. Flipping concerns the organization of learning, rather than the structure of a textbook.',
      'Video allows students to learn at their own pace by pausing and replaying explanations. Class time creates opportunities for individualized attention and differentiation: the teacher can provide different support or challenges according to students’ needs. Engagement means actively working with the content, for example by taking notes or answering questions. Opening a video alone does not show that a student has understood it.'
    ],
    readingSupport: [
      'Trong dạng lớp học đảo ngược cơ bản được mô tả, người học xem phần giảng qua video trước giờ học; phần thực hành và vận dụng chuyển vào lớp để giáo viên hỗ trợ. Mục tiêu là sử dụng thời gian gặp mặt trực tiếp hiệu quả.',
      'Video cho phép dừng và xem lại theo nhịp độ riêng. Trên lớp, giáo viên hỗ trợ từng cá nhân và phân hóa theo nhu cầu. Engagement là chủ động làm việc với nội dung, như ghi chú hoặc trả lời câu hỏi; chỉ mở video chưa chứng tỏ đã hiểu.'
    ],
    vocabulary: [
      v('direct instruction', 'hướng dẫn/giảng dạy trực tiếp', 'Hình thức dạy', 'Direct instruction can be delivered through video.', 'Phần giảng được chuyển ra ngoài giờ lớp trong mô tả cơ bản; trang PDF 1.'),
      v('face-to-face class time', 'thời gian gặp mặt trực tiếp trên lớp', 'Tổ chức học', 'Use face-to-face class time for guided practice.', 'Dành thời gian lớp cho hoạt động cần tương tác; trang PDF 1.'),
      v('at one’s own pace', 'theo nhịp độ riêng', 'Trải nghiệm học', 'Students can learn at their own pace.', 'Dừng/xem lại khi cần; mục Students Can Learn at Their Pace, trang PDF 2.'),
      v('differentiation', 'dạy học phân hóa', 'Phương pháp', 'Differentiation responds to different learning needs.', 'Điều chỉnh hỗ trợ/thử thách cho từng người; trang PDF 2.'),
      v('engagement', 'sự tham gia tích cực', 'Quá trình học', 'Questions encourage engagement with the video.', 'Tương tác với nội dung qua ghi chú/câu hỏi; trang PDF 1, 3.'),
      v('individualized attention', 'sự quan tâm/hỗ trợ cho từng cá nhân', 'Hỗ trợ học tập', 'Class time allows individualized attention.', 'Giáo viên hỗ trợ nhu cầu của người học; trang PDF 3.')
    ],
    quiz: [
      q('Which sequence matches the basic flipped classroom described in the passage?', ['Watch instruction before class; apply ideas in class with support', 'Listen to instruction in class; complete application work alone at home', 'Watch instruction in class; complete the same practice alone at home', 'Complete application work before class; hear the explanation afterward'], 0, 'Dạng cơ bản chuyển phần giảng qua video ra trước giờ học, dành giờ lớp cho vận dụng có hỗ trợ. Nghe giảng trên lớp rồi tự làm bài ở nhà là mô hình truyền thống được so sánh trong nguồn.'),
      q('What does learning “at their own pace” allow students to do?', ['Follow the same video schedule without returning to earlier sections', 'Pause and replay an explanation according to their own needs', 'Spend class time listening to the same explanation at a fixed speed', 'Choose a different topic whenever an explanation becomes difficult'], 1, 'At their own pace là theo nhịp độ riêng; dừng và xem lại cho phép xử lý phần khó theo nhu cầu cá nhân.'),
      q('Which classroom action is an example of differentiation?', ['Assigning the same task and support to every student', 'Grouping students only by which video they watched first', 'Offering extra guidance to some students and a greater challenge to others', 'Replacing students’ questions with a single whole-class explanation'], 2, 'Differentiation điều chỉnh hỗ trợ và độ thử thách cho nhu cầu khác nhau, không chỉ đổi nhóm hoặc dùng một cách hướng dẫn chung.'),
      q('Which evidence best shows engagement with the content of a video?', ['A record that the video page was opened', 'A note of the video’s title and total length', 'A list of the dates on which videos were assigned', 'Notes explaining key ideas and responses to content questions'], 3, 'Ghi chú ý chính và trả lời câu hỏi cho thấy người học làm việc với nội dung; việc mở trang hay ghi thời lượng mới chỉ phản ánh truy cập.')
    ]
  }
];
