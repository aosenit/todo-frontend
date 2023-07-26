import { Button } from "@mantine/core";

const Success = () => {
  return (
    <div className="w-full h-full bg-[var(--lightPrimary-color)] ">
      <div className="h-[60%] w-full bg-[var(--primary-color)] rounded-b-[64px] text-white text-center flex flex-col justify-center items-center px-5">
        <img src="/success-bg.png" alt="" className="w-[248px] h-[248px]" />
        <h2 className="text-[24px] font-extrabold">Success!</h2>
        <p className="text-[14px] font-medium text-gray-200 max-w-[30ch]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, modi
          saepe.
        </p>
      </div>
      <div className="h-[40%] flex px-5 justify-center items-center">
        <Button className="shadow-md bg-white hover:bg-white  text-[var(--primary-color)] hover:text-[var(--primary-color)] w-full h-[46px] hover:opacity-90 transition">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Success;
