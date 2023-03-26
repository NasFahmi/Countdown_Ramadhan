
import Form from "./Form";
export default function Section() {
  return (
    <div>
      <div className="background bg-Sand w-full h-full">
        <div className="bg-darkBlue w-full h-full z-10 rounded-t-[45px] py-8 flex justify-center items-center flex-col">
          <div className="container py-8 flex justify-center items-center flex-col">
            <Form  />
            <div className="grid grid-cols-2 justify-center items-center px-8 gap-4 mt-8 md:grid-cols-4 md:grid-flow-row lg:grid-cols-6">
              <div className="bg-whiteCostume rounded-2xl w-fit px-10 py-5">
                <h1 className="text-center font-medium">Imsak</h1>
                <h1 className="text-center">04:19 WIB</h1>
              </div>
              <div className="bg-whiteCostume rounded-2xl w-fit px-10 py-5">
                <h1 className="text-center font-medium">Shubuh</h1>
                <h1 className="text-center">04:19 WIB</h1>
              </div>
              <div className="bg-whiteCostume rounded-2xl w-fit px-10 py-5">
                <h1 className="text-center font-medium">Dhuhur</h1>
                <h1 className="text-center">04:19 WIB</h1>
              </div>
              <div className="bg-whiteCostume rounded-2xl w-fit px-10 py-5">
                <h1 className="text-center font-medium">Ashar</h1>
                <h1 className="text-center">04:19 WIB</h1>
              </div>
              <div className="bg-whiteCostume rounded-2xl w-fit px-10 py-5 md:row-start-2 md:col-start-2 lg:row-start-auto lg:col-start-auto">
                <h1 className="text-center font-medium">Magrib</h1>
                <h1 className="text-center">04:19 WIB</h1>
              </div>
              <div className="bg-whiteCostume rounded-2xl w-fit px-10 py-5 md:row-start-2 md:col-start-3 lg:row-start-auto lg:col-start-auto">
                <h1 className="text-center font-medium">Isya</h1>
                <h1 className="text-center">04:19 WIB</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
