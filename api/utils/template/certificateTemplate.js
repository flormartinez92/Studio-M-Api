module.exports = (user, course, createdAt, mysteryFont, msgothicFont, background, signature) => `
<style>
  @font-face {
    font-family: 'MysteryMixed';
    src: url(data:font/opentype;base64,${mysteryFont}) format('opentype');
  }
  @font-face {
    font-family: 'MsGothic';
    src: url(data:font/opentype;base64,${msgothicFont}) format('opentype');
  }
</style>
<div style="position: relative; width: 100vw; height: 80vh; transform-origin: center; transform: rotate(90deg) translateX(-65px) translateY(35px);">
  <img
    src='data:image/png;base64,${background}');
    alt="Picture"
    style="width: 73rem; height: 80%; margin-top: 5rem; margin-bottom: 5rem;"
  />
  <div style="position: absolute; top: 45%; left: 68.75%; transform: translate(-50%, -50%); text-align: center; width: 70%;">
    ${" "}
    <div style="display: flex; flex-direction: column; align-items: center; margin-top: 2px; gap: 8px;">
      <h2 style="font-size: 40px; font-family: 'MysteryMixed'; font-weight: normal; margin-bottom: 1px; line-height: 0.5;">Certificado</h2>
      <h3 style="font-size: 45px; font-family: MysteryMixed; font-weight: normal;">${course.courseLongTitle}</h3>
      <p style="font-size: 1rem; font-family: 'MsGothic'; line-height: 0rem;">${user.name + " " + user.lastname}</p>
      <p style="font-size: 1rem; font-family: 'MsGothic'; line-height: 1.25rem;">${Number(user.dni).toLocaleString().replace(",", ".")}</p>
      <p style="font-size: 1rem; font-family: 'MsGothic'; margin-bottom: 0.5rem; margin-top: 0.5rem; line-height: 1.25rem;">Ha realizado y completado con éxito su curso en by M Studio, cumpliendo con todos los requisitos académicos exigidos</p>
      <p style="font-size: 1rem; font-family: 'MsGothic'; line-height: 1.25rem;">${createdAt}</p>
      <div style="display: flex; flex-direction: row; justify-content: space-around; align-items: center; width: 100%;">
        <div>
          <h3 style="font-family: 'MysteryMixed'; font-weight: normal; font-size: 1.25rem; line-height: 1.375rem;">Studio by M</h3>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <Image
            src='data:image/png;base64,${signature}');
            alt="Signature"
            style="width: 35px; height: 60px;"
          />
          <div className="">
            <h4 style="font-family: 'MsGothic'; font-size: 1rem; text-align: center; line-height: 1rem; font-weight: normal;">Macarena <br />Bernal</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;