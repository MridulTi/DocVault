import { ShareIcon } from "lucide-react";
import { useState } from "react";

const Display = ({ contract, account }) => {

  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        console.log("kfnkdnf");
        dataArray = await contract.display(account);
        console.log(dataArray);
      }
    } catch (e) {

      alert(`You don't have access ${account}`);
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str);
      // console.log(str_array);
      const images = str_array.map((item, i) => {
        return (
          <div className="rounded-xl w-72 aspect-square  grid overflow-hidden bg-gray-5 shadow-lg">
            <a href={item} key={i} target="_blank">
              <img
                key={i}
                className="border border-bottom-2 border-gray-10 object-center object-cover aspect-video items-center"
                src={item}
                alt={item} />
              <div className="text-gray-10 px-6 py-2">
                <h1 className="font-bold text-lg">Photos</h1>
                <p className="text-gray-1 font-light text-md">Description</p>
                <button className="flex gap-4 bg-blues-3 px-12 rounded" onClick="">
                  Share <ShareIcon/>
                </button>
              </div>
            </a>
          </div>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };
  return (
    <div className="w-[50vw]">
      <div className="overflow-x-auto pb-4 w-[80vw]">
        <div className="flex gap-6">{data}</div>
      </div>
      <div className="py-6 flex gap-2">
        <input
          type="text"
          placeholder="Enter Address"
          className="address px-5 py-2"
        ></input>
        <button className="bg-blues-3 px-12 rounded" onClick={getdata}>
          Get Data
        </button>
      </div>

    </div>
  );
};
export default Display;