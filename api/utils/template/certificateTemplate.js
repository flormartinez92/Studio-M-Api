const mysteryMixed = "'MysteryMixed', sans-serif";

module.exports = (user, course, createdAt, base64Font) => `
<style>
  @font-face {
    font-family: 'MysteryMixed';
    src: url(data:font/opentype;base64,${base64Font}) format('opentype');
  }
</style>
<div style="position: relative;">
  <img
    src="../../assets/images/paper-background.png"
    width={900}
    height={900}
    alt="Picture"
    style="margin-top: 0.75rem;"
  />
  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; width: 70%;">
    ${" "}
    <div style="display: flex; flex-direction: column; align-items: center; margin-top: 2px; gap: 8px;">
      <h2 style="font-size: 20px; font-family: ${mysteryMixed}; margin-bottom: 1px; line-height: 1.5;">Certificado</h2>
      <h3 style="font-size: 24px; font-family: ${mysteryMixed};">${course.courseLongTitle}</h3>
      <p style="font-size: 0.875rem; font-family: 'ms-gothic'; line-height: 1.25rem;">${user.name + user.lastname}</p>
      <p style="font-size: 0.875rem; font-family: 'ms-gothic'; line-height: 1.25rem;">${Number(user.dni).toLocaleString().replace(",", ".")}</p>
      <p style="font-size: 0.875rem; font-family: 'ms-gothic'; margin-bottom: 0.5rem; margin-top: 0.5rem; line-height: 1.25rem;">${course.courseDescription}</p>
      <p style="font-size: 0.875rem; font-family: 'ms-gothic'; line-height: 1.25rem;">${createdAt}</p>
      <div style="display: flex; flex-direction: row; justify-content: space-around; align-items: center; width: 100%;">
        <div>
          <h3 style="font-family: 'mystery-mixed'; font-size: 1.125rem; line-height: 1.375rem;">Studio by M</h3>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <Image
            src="/img/firma.png"
            width={100}
            height={100}
            alt="Signature"
            style="width: 35px; height: 60px;"
          />
          <div className="">
            <h4 style="font-family: 'ms-gothic'; font-size: 0.75rem; text-align: center; line-height: 1rem;">Macarena <br />Bernal</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;