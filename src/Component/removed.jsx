<div className="col-sm-6 my-sm-0 my-3">
<p className="fs14 fw-semibold text-lg ">Time Setting</p>
<div className="flex flex-col flex-wrap flex-xl-row justify-between">
  {" "}
  <div className="">
    {/* Toggle finish */}
    <div className="flex gap-2 justify-between align-items-center ">
      <p className=" my-auto"> Entry time </p>
      <input
        type="text"
        className="border-1 outline-none border-slate-400 p-2 rounded"
        value={EntryTime}
      />
    </div>
    {/* Toggle button */}
    <div className="flex flex-wrap my-2 gap-2">
      <div class="checkbox_item citem_1 ">
        <label class="checkbox_wrap">
          <input
            onClick={() => {
              if (EntryTime == "Immediate") setentrytime("09:30:00");
              else setentrytime("Immediate");
            }}
            type="checkbox"
            name="checkbox"
            class="checkbox_inp"
          />
          <span class="checkbox_mark"></span>
        </label>
      </div>
      <p className="fs14 ">Immediate</p>
      <img
        className="w-[20px] h-[20px] cursor-pointer"
        src={require("../assest/info.png")}
        alt="info logo"
      />
    </div>{" "}
  </div>
  <div className="">
    {/* Toggle finish */}
    <div className="flex flex-wrap gap-2 justify-between align-items-center ">
      <p className=" my-auto"> Exit time </p>
      <input
        type="text"
        className="border-1 outline-none border-slate-400 p-2 rounded"
        value={exittime}
      />
    </div>
  </div>
</div>

</div>