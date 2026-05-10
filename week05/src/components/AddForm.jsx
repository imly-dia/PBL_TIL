function AddForm() {
    return (
      <section id="form-section" className="form-container hidden">
        <form id="add-lion-form">
          <button type="button" className="btn-random-fill">🎲 랜덤 값 채우기</button>
          <div className="form-grid">
            <div className="form-group full">
              <label>프로필 이미지 (파일명 또는 URL)</label>
              <input type="text" name="profileImg" required />
            </div>
            <div className="form-group"><label>이름</label><input type="text" name="name" required /></div>
            <div className="form-group"><label>파트</label>
              <select name="part" required>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Design">Design</option>
              </select>
            </div>
            <div className="form-group full"><label>관심 기술 (쉼표 구분)</label><input type="text" name="skills" required /></div>
            <div className="form-group full"><label>한 줄 소개</label><input type="text" name="oneLine" required /></div>
            <div className="form-group full"><label>자기소개</label><textarea name="bio" required></textarea></div>
            <div className="form-group"><label>Email</label><input type="email" name="email" required /></div>
            <div className="form-group"><label>Phone</label><input type="tel" name="phone" required /></div>
            <div className="form-group full"><label>Website</label><input type="url" name="website" required /></div>
            <div className="form-group full"><label>한 마디</label><input type="text" name="resolution" required /></div>
          </div>
          <div className="form-footer">
            <button type="submit" className="btn-submit">추가하기</button>
            <button type="button" className="btn-cancel">취소</button>
          </div>
        </form>
      </section>
    );
  }
  export default AddForm;
