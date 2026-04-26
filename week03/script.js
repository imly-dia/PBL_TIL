// [초기 데이터] 
let members = [
    {
        id: Date.now(),
        name: "조윤아",
        profileImg: "IMG_2136.jpeg", 
        part: "Frontend",
        skills: ["React", "TypeScript", "CSS"],
        oneLine: "안녕하세요 14기 아기사자 조윤아입니다!",
        bio: "정보통신공학과 조윤아입니다.",
        email: "box7431@naver.com",
        phone: "010-4564-0000",
        website: "https://www.instagram.com/imly._.dia",
        resolution: "열정을 가진 팀원들과 함께 1년 동안 열심히 하겠습니다!",
        isMe: true
    }
];

const summaryGrid = document.getElementById('summary-grid');
const detailList = document.getElementById('detail-list');
const totalCount = document.getElementById('total-count');
const formSection = document.getElementById('form-section');
const addForm = document.getElementById('add-lion-form');

// 초기 실행 함수
function init() {
    render();

    // 폼 열고 닫기
    document.getElementById('btn-toggle-form').addEventListener('click', () => {
        formSection.classList.toggle('hidden');
    });

    // 취소 버튼
    document.getElementById('btn-cancel').addEventListener('click', () => {
        formSection.classList.add('hidden');
        addForm.reset();
    });

    // 마지막 삭제 버튼
    document.getElementById('btn-delete-last').addEventListener('click', () => {
        if (members.length > 1) { // 나 자신은 삭제 안 되게 보호!
            members.pop();
            render();
        } else {
            alert("최소 한 명의 명단은 유지해야 합니다.");
        }
    });

    // 폼 제출 이벤트
    addForm.addEventListener('submit', handleFormSubmit);
}

// 화면을 다시 그리는 함수 
function render() {
    summaryGrid.innerHTML = '';
    detailList.innerHTML = '';

    members.forEach(m => {
        summaryGrid.appendChild(createSummaryCard(m));
        detailList.appendChild(createDetailCard(m));
    });

    totalCount.textContent = members.length;
}

// 요약 카드 생성
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

// 상세 카드 생성
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

// 폼 제출 로직
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
    render();
    addForm.reset();
    formSection.classList.add('hidden');
}

init();
