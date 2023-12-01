module.exports = (user, course) => `
<div className="relative">
<Image
  src="/img/paper-background.png"
  width={900}
  height={900}
  alt="Picture"
  className="mt-3"
/>
<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[70%]">
  {" "}
  <div className="flex flex-col align-center items-center my-2 gap-y-1">
    <h2 className="text-[20px] font-mystery-mixed mb-1 lg:text-[24px]">Certificado</h2>
    <h3 className="text-2xl font-mystery-mixed lg:text-3xl">${course.courseLongTitle}</h3>
    <p className="text-sm font-ms-gothic lg:text-base">${user.name + user.lastname}</p>
    <p className="text-sm font-ms-gothic lg:text-base">${user.dni}</p>
    <p className="text-sm font-ms-gothic mb-2 mt-2 lg:text-base">${course.courseDescription}</p>
    <div className="flex flex-row justify-around align-center items-center w-full">
      <div>
        <h3 className=" font-mystery-mixed text-[18px] lg:text-[22px]">Studio by M</h3>
      </div>
      <div className="flex flex-col items-center align-center">
        <Image
          src="/img/firma.png"
          width={100}
          height={100}
          alt="Signature"
          className="w-[35px] h-[60px] lg:w-[39px] lg:h-[64px]"
        />
        <div className="">
          <h4 className=" font-ms-gothic text-xs text-center lg:text-sm ">Macarena <br />Bernal</h4>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
`;