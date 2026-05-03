
let members = [
    {
        id: "me",
        name: "조윤아",
        profileImg: "IMG_2136.jpeg", 
        part: "Frontend",
        skills: ["React", "TypeScript", "CSS"],
        oneLine: "안녕하세요 14기 아기사자 조윤아입니다!",
        bio: "반갑습니다! 정보통신공학과 조윤아입니다.",
        email: "box7431@naver.com",
        phone: "010-4564-0000",
        website: "https://www.instagram.com/imly._.dia",
        resolution: "열정을 가진 팀원들과 함께 1년 동안 열심히 하겠습니다!",
        isMe: true
    }
];


let lastRequestTask = null;


const summaryGrid = document.getElementById('summary-grid');
const detailList = document.getElementById('detail-list');
const totalCount = document.getElementById('total-count');
const statusArea = document.getElementById('status-area');
const formSection = document.getElementById('form-section');
const addForm = document.getElementById('add-lion-form');

const filterPart = document.getElementById('filter-part');
const sortOrder = document.getElementById('sort-order');
const searchInput = document.getElementById('search-input');
const emptyMessage = document.getElementById('empty-message');


function init() {
    applyViewOptions();

    // 외부 데이터 컨트롤 이벤트
    document.getElementById('fetch-1').addEventListener('click', () => fetchLions(1));
    document.getElementById('fetch-5').addEventListener('click', () => fetchLions(5));
    document.getElementById('fetch-refresh').addEventListener('click', () => {
        // 나를 제외한 현재 인원수만큼 새로고침
        fetchLions(members.length - 1, true);
    });

    // 보기 옵션 변경 이벤트 (실시간 반영)
    filterPart.addEventListener('change', applyViewOptions);
    sortOrder.addEventListener('change', applyViewOptions);
    searchInput.addEventListener('input', applyViewOptions);

    // 폼 조작 관련 이벤트
    document.getElementById('btn-toggle-form').addEventListener('click', () => formSection.classList.toggle('hidden'));
    document.getElementById('btn-cancel').addEventListener('click', () => {
        formSection.classList.add('hidden');
        addForm.reset();
    });
    document.getElementById('btn-random-fill').addEventListener('click', fillRandomForm);
    document.getElementById('btn-delete-last').addEventListener('click', deleteLastMember);

    addForm.addEventListener('submit', handleFormSubmit);
}

/**
 * 외부 데이터 불러오기
 */
async function fetchLions(count, isRefresh = false) {
    if (count <= 0 && isRefresh) return;

    updateStatus("loading");
    lastRequestTask = () => fetchLions(count, isRefresh);

    try {
        const url = `https://randomuser.me/api/?results=${count}&nat=us,gb,ca,au,nz`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error("데이터를 가져오는 데 실패했습니다.");
        
        const data = await response.json();
        const newLions = transformData(data.results);

        if (isRefresh) {
            const me = members.find(m => m.isMe);
            members = me ? [me, ...newLions] : [...newLions];
        } else {
            members = [...members, ...newLions];
        }

        updateStatus("success");
        applyViewOptions(); // 
    } catch (error) {
        updateStatus("error", error.message);
    }
}

/**
 * API 응답 데이터를 앱의 규격에 맞게 변환
 */
function transformData(apiResults) {
    const parts = ["Frontend", "Backend", "Design"];
    return apiResults.map(user => ({
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        profileImg: user.picture.large,
        part: parts[Math.floor(Math.random() * parts.length)],
        skills: ["JavaScript", "HTML/CSS", "API"],
        oneLine: "반갑습니다! 비동기 통신으로 합류한 사자입니다.",
        bio: `안녕하세요, ${user.location.city}에서 온 개발자 지망생입니다.`,
        email: user.email,
        phone: user.phone,
        website: "https://github.com",
        resolution: "함께 멋진 프로젝트를 만들고 싶습니다!",
        isMe: false
    }));
}

/**
 * 현재 데이터 + 보기 옵션을 계산하여 렌더링
 */
function applyViewOptions() {
    const part = filterPart.value;
    const sort = sortOrder.value;
    const keyword = searchInput.value.toLowerCase();

    // 1. 필터링 & 검색 적용
    let filtered = members.filter(m => {
        const matchPart = (part === "all" || m.part === part);
        const matchKeyword = m.name.toLowerCase().includes(keyword);
        return matchPart && matchKeyword;
    });

    // 2. 정렬 적용
    if (sort === "name") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        // 최신추가순 
        filtered = [...filtered].reverse();
    }

    renderUI(filtered);
}

/**
 * 최종 화면 렌더링
 */
function renderUI(displayList) {
    summaryGrid.innerHTML = '';
    detailList.innerHTML = '';

    // 결과가 없을 때 처리
    if (displayList.length === 0) {
        emptyMessage.classList.remove('hidden');
    } else {
        emptyMessage.classList.add('hidden');
        displayList.forEach(m => {
            summaryGrid.appendChild(createSummaryCard(m));
            detailList.appendChild(createDetailCard(m));
        });
    }

    totalCount.textContent = members.length;
}

/**
 * 비동기 상태 UI 업데이트
 */
function updateStatus(state, message = "") {
    const apiButtons = document.querySelectorAll('.btn-api');
    
    if (state === "loading") {
        apiButtons.forEach(btn => btn.disabled = true);
        statusArea.innerHTML = "⌛ 불러오는 중...";
    } else if (state === "success") {
        apiButtons.forEach(btn => btn.disabled = false);
        statusArea.innerHTML = "✅ 완료!";
        setTimeout(() => statusArea.innerHTML = "준비 완료", 2000);
    } else if (state === "error") {
        apiButtons.forEach(btn => btn.disabled = false);
        statusArea.innerHTML = `<span class="status-error">❌ ${message}</span> <button class="btn-retry" id="btn-retry">재시도</button>`;
        document.getElementById('btn-retry').onclick = lastRequestTask;
    }
}

/**
 * 폼 랜덤 값 채우기
 */
async function fillRandomForm() {
    try {
        updateStatus("loading");
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const user = transformData(data.results)[0];

        addForm.profileImg.value = user.profileImg;
        addForm.name.value = user.name;
        addForm.part.value = user.part;
        addForm.skills.value = user.skills.join(', ');
        addForm.oneLine.value = user.oneLine;
        addForm.bio.value = user.bio;
        addForm.email.value = user.email;
        addForm.phone.value = user.phone;
        addForm.website.value = user.website;
        addForm.resolution.value = user.resolution;

        updateStatus("success");
    } catch (e) {
        updateStatus("error", "데이터를 가져오지 못했습니다.");
    }
}

// 카드 생성 로직 
function createSummaryCard(m) {
    const card = document.createElement('article');
    card.className = `member-card ${m.isMe ? 'my-card' : ''}`;
    card.innerHTML = `
        <div class="image-wrapper">
            <span class="tech-badge">${m.skills[0]}</span>
            <img src="${m.profileImg}" alt="${m.name}" class="card-img" onerror="this.src='https://via.placeholder.com/150'">
        </div>
        <div class="card-info">
            <p class="card-name"><strong>${m.name} ${m.isMe ? '(나)' : ''}</strong></p>
            <p class="card-part">${m.part}</p>
            <p class="card-one-line">${m.oneLine}</p>
        </div>
    `;
    return card;
}

function createDetailCard(m) {
    const card = document.createElement('article');
    card.className = 'detail-card';
    card.innerHTML = `
        <div class="detail-header">
            <img src="${m.profileImg}" class="detail-img" onerror="this.src='https://via.placeholder.com/150'">
            <div>
                <h3 style="color:#ff6b00">${m.name}</h3>
                <p style="font-size:12px; color:#888;">${m.part} | LIKELION 14th</p>
            </div>
        </div>
        <div style="margin-bottom:15px;">
            <p style="font-weight:bold; font-size:14px; margin-bottom:5px;">자기소개</p>
            <p style="font-size:14px; color:#555;">${m.bio}</p>
        </div>
        <div style="margin-bottom:15px;">
            <p style="font-weight:bold; font-size:14px; margin-bottom:5px;">관심 기술</p>
            <ul style="list-style:none; display:flex; gap:10px; font-size:13px; color:#ff4d7d;">
                ${m.skills.map(s => `<li>#${s}</li>`).join('')}
            </ul>
        </div>
        <div style="font-size:13px; border-top:1px dashed #ddd; padding-top:10px;">
            <p>📧 ${m.email} | 📱 ${m.phone}</p>
            <p>🔗 <a href="${m.website}" target="_blank" style="color:#666; text-decoration:none;">${m.website}</a></p>
        </div>
        <p style="margin-top:10px; font-weight:bold; color:#ff4d7d;">"${m.resolution}"</p>
    `;
    return card;
}

// 폼 제출 및 삭제 로직
function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(addForm);
    const newMember = {
        id: Date.now(),
        profileImg: formData.get('profileImg'),
        name: formData.get('name'),
        part: formData.get('part'),
        skills: formData.get('skills').split(',').map(s => s.trim()),
        oneLine: formData.get('oneLine'),
        bio: formData.get('bio'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        website: formData.get('website'),
        resolution: formData.get('resolution'),
        isMe: false
    };
    members.push(newMember);
    applyViewOptions();
    addForm.reset();
    formSection.classList.add('hidden');
}

function deleteLastMember() {
    if (members.length > 1) {
        members.pop();
        applyViewOptions();
    } else {
        alert("최소 한 명의 명단은 유지해야 합니다.");
    }
}

// 실행 시작
init();