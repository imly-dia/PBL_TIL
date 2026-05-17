import { useState } from "react";
import { transformApiData } from "../utils/dataHandlers";

function AddForm({ isOpen, onClose, onAdd }) {
  const initialFormState = {
    name: "", part: "Frontend", skills: "", oneLine: "",
    bio: "", email: "", phone: "", website: "", resolution: "", profileImg: ""
  };

  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearAndClose = () => {
    setForm(initialFormState);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...form,
      id: Date.now(),
      skills: form.skills.split(",").map((s) => s.trim()),
      isMe: false
    });
    handleClearAndClose();
  };

  const handleRandomFill = async () => {
    try {
      const res = await fetch("https://randomuser.me/api/");
      const data = await res.json();
      const mockLion = transformApiData(data.results)[0];
      
      setForm({
        name: mockLion.name,
        part: mockLion.part,
        skills: mockLion.skills.join(", "),
        oneLine: mockLion.oneLine,
        bio: mockLion.bio,
        email: mockLion.email,
        phone: mockLion.phone,
        website: mockLion.website,
        resolution: mockLion.resolution,
        profileImg: mockLion.profileImg
      });
    } catch (e) {
      alert("랜덤 데이터를 가져오는데 실패했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <section className="form-container">
      <form onSubmit={handleSubmit}>
        <button type="button" className="btn-random-fill" onClick={handleRandomFill}>🎲 랜덤 값 채우기</button>
        <div className="form-grid">
          <div className="form-group full">
            <label>프로필 이미지 주소</label>
            <input type="text" name="profileImg" value={form.profileImg} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>이름</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>파트</label>
            <select name="part" value={form.part} onChange={handleChange} required>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Design">Design</option>
            </select>
          </div>
          <div className="form-group full">
            <label>관심 기술 (쉼표 구분)</label>
            <input type="text" name="skills" value={form.skills} onChange={handleChange} required />
          </div>
          <div className="form-group full">
            <label>한 줄 소개</label>
            <input type="text" name="oneLine" value={form.oneLine} onChange={handleChange} required />
          </div>
          <div className="form-group full">
            <label>자기소개</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} required></textarea>
          </div>
          <div className="form-group"><label>Email</label><input type="email" name="email" value={form.email} onChange={handleChange} required /></div>
          <div className="form-group"><label>Phone</label><input type="tel" name="phone" value={form.phone} onChange={handleChange} required /></div>
          <div className="form-group full"><label>Website</label><input type="url" name="website" value={form.website} onChange={handleChange} required /></div>
          <div className="form-group full"><label>한 마디</label><input type="text" name="resolution" value={form.resolution} onChange={handleChange} required /></div>
        </div>
        <div className="form-footer">
          <button type="submit" className="btn-submit">추가하기</button>
          <button type="button" className="btn-cancel" onClick={handleClearAndClose}>취소</button>
        </div>
      </form>
    </section>
  );
}
export default AddForm;