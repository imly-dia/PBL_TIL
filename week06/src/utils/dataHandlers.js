export function transformApiData(apiResults) {
    const parts = ["Frontend", "Backend", "Design"];
    return apiResults.map((user) => ({
      id: user.login.uuid,
      name: `${user.name.first} ${user.name.last}`,
      profileImg: user.picture.large,
      part: parts[Math.floor(Math.random() * parts.length)],
      skills: ["JavaScript", "HTML/CSS", "React"],
      oneLine: "반갑습니다! 비동기 통신으로 합류한 사자입니다.",
      bio: `안녕하세요, ${user.location.city}에서 온 개발자 지망생입니다.`,
      email: user.email,
      phone: user.phone,
      website: "https://github.com",
      resolution: "함께 멋진 프로젝트를 만들고 싶습니다!",
      isMe: false,
    }));
  }
  

  export function getFilteredAndSortedLions(members, part, sort, keyword) {
    let result = members.filter((m) => {
      const matchPart = part === "all" || m.part === part;
      const matchKeyword = m.name.toLowerCase().includes(keyword.toLowerCase());
      return matchPart && matchKeyword;
    });

    if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result = [...result].reverse();
    }
  
    return result;
  }
