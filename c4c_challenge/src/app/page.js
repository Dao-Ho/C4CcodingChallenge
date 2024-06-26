"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Home() {
  //initalize const
  const [partnerName, setPartnerName] = useState("");
  const [partnerBio, setPartnerBio] = useState("");
  const [isActive, setIsActive] = useState(0);
  const [partnerLogo, setPartnerLogo] = useState(null);

  const [fetchedPartnerData, setfetchedPartnerData] = useState([]);

  //supabase key: normally, this would be in an .env file and used as a variable/const, but for ease of access, it is directly delcared here:
  const supabaseUrl = "https://uwsapftobgquvcuawblq.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3c2FwZnRvYmdxdXZjdWF3YmxxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxODMyNzExMiwiZXhwIjoyMDMzOTAzMTEyfQ.ksRFbR54gf70ZzPk-N-_ih7aVyKQ7ZoxfUsNao3Ya-w";

  const supabase = createClient(supabaseUrl, supabaseKey);

  /**
   * method to fetch all data in our supabase table
   */
  const fetchPartnerDataFromSupabase = async () => {
    try {
      const { data, error } = await supabase.from("partners").select("*");
      console.log("Fetched data:", data); // Log the fetched data
      if (error) {
        console.error("Error fetching partner names from Supabase:", error);
      } else {
        setfetchedPartnerData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deletePartner = async (partnerId) => {
    try {
      const {} = await supabase
        .from("partners")
        .delete()
        .eq("partnerId", partnerId);
      console.log("deleted partner data");
      fetchPartnerDataFromSupabase(); // Fetch updated data after deletion
    } catch (error) {
      console.error("Error deleting partner:", error.message);
    }
  };

  //perform the following when the page loads/initialize
  useEffect(() => {
    // fetch all partners data from previous operations
    fetchPartnerDataFromSupabase();
    console.log(fetchedPartnerData);
  }, []);

  //function when submitted
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("button clicked");

    //validate the inputs
    if (!partnerLogo) {
      alert("No logo selected!");

      if (!partnerName) {
        alert("No name given");
      }

      if (!partnerBio) {
        alert("No bio given");
      }
    }

    //base 64 encoding of image and upload it to supabase:
    const reader = new FileReader();
    try {
      if (partnerLogo) {
        reader.readAsDataURL(partnerLogo);
        reader.onloadend = async () => {
          const convertedImage = reader.result;
          console.log(convertedImage);

          const { data, error } = await supabase.from("partners").insert([
            {
              partnerName: partnerName,
              partnerBio: partnerBio,
              partnerLogo: convertedImage,
              isActive: isActive,
            },
          ]);
          // Fetch the updated data
          fetchPartnerDataFromSupabase();
          //catch error message
          if (error) {
            console.log("error uploading data to db: " + error);
          } else {
            console.log("db updated with:" + data);
          }
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex w-[100vw] bg-[#f4f4f4] text-[#393939] overflow-scroll">
      <div className=" w-[70vw] bg-[#f4f4f4] h-[100vh]">
        <div className="flex flex-col justify-center bg-[#f4f4f4]">
          <div className="flex w-full h-[13vh] items-center ml-[1.5vw]">
            <img
              src="https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/C4C_Icon_Gradient.png"
              alt="Logo"
              className="h-[9vh] w-[9vh]"
            />
          </div>
          <div className="flex flex-wrap w-[70vw] y-overflow">
            {fetchedPartnerData.map((partner) => (
              <div
                key={partner.partnerId}
                className="flex w-[30vw] h-[40vh] justify-center flex-col mx-[2vw] my-[3vh]"
              >
                <div className="] w-[30vw] h-[3vh]">
                  <h2 className="text-xl font-bold">{partner.partnerName}</h2>
                </div>
                <div className="w-[32vw] h-[15vh] mt-[1vh]">
                  <p className="text-gray-700 mt-2">{partner.partnerBio}</p>
                </div>
                <div className="flex w-[30vw] h-[3vh] my-[1vh] flex-row">
                  {partner.isActive == 1 ? (
                    <h1 className="text-[#9daf89] font-semibold"> Active</h1>
                  ) : (
                    <h1 className="text-[#ff7f7f] font-semibold">Inactive</h1>
                  )}
                  <button
                    onClick={() => deletePartner(partner.partnerId)}
                    className="
                  ml-[2vw]
                  h-[3vh]
                  w-[5vw]
                  font-small
                  bg-[#393939] text-[#ffffff]
                  hover:border-[#393939]
                  hover:border-[0.2vw]
                  rounded-[0.5vw]
                  hover:cursor-pointer hover:bg-[#ffffff]
                  hover:text-[#393939]"
                  >
                    delete
                  </button>
                </div>
                <div className="w-[30vw] h-[15vh] mt-[1vh]">
                  <img
                    src={partner.partnerLogo}
                    alt={partner.partnerName}
                    className="object cover x-auto h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex bg-[#fcfcfc] w-[30vw] h-[100vh] rounded-tl-[2vw] rounded-bl-[2vw] items-center justify-center flex-col translate-x-[70vw] fixed">
        <h1 className="h-[8vh] font-extrabold text-[2vw]">Add a New Partner</h1>
        <form>
          <div className="w-full flex flex-col items-center">
            <div className="w-full">
              <div>
                <h1 className="font-bold text-[1vw] mt-[2vh]">Partner Name</h1>
                <input
                  type="text"
                  name="partnerName"
                  className="py-[1vh] border-[#f4f4f4] border-[2px] placeholder placeholder:
                placeholder:pl-[1vw] text:pl-[1vw] px-[1vw]"
                  placeholder="Partner Name"
                  onChange={(e) => setPartnerName(e.target.value)}
                />
              </div>
              <div>
                <h1 className="font-bold text-[1vw] mt-[2vh]">Partner Bio</h1>
                <input
                  type="text"
                  name="partnerBio"
                  className="py-[1vh] border-[#f4f4f4] border-[2px] placeholder placeholder:
                placeholder:pl-[1vw] text:pl-[1vw] px-[1vw]"
                  placeholder="Partner Bio"
                  onChange={(e) => setPartnerBio(e.target.value)}
                />
              </div>
              <div className="mt-[2vh]">
                <div class="flex items-center mb-4">
                  <input
                    id="default-checkbox"
                    onChange={(e) => setIsActive(e.target.checked ? 1 : 0)}
                    type="checkbox"
                    value="1"
                    class="w-[1vw] h-[1vw] text-[#f4f4f4] bg-gray-100 border-gray-300 rounded active:bg-[#393939] focus:ring-[#393939] dark:focus:ring-[#f4f4f4] focus:ring-2 dark:bg-[#f4f4f4] dark:border-gray-600"
                  />
                  <label
                    for="default-checkbox"
                    class="ms-2 text-sm font-bold text-[#393939]"
                  >
                    Active
                  </label>
                </div>
              </div>
              <div>
                <h1 className="font-bold text-[1vw] mt-[2vh]">Partner Logo</h1>
                <input
                  type="file"
                  accept="image/*"
                  className="text-sm text-stone-500 mt-[1vh]
                  file:rounded-[1vw]
                  file:h-[4vh]
                  file:w-[10vw]
                  file:font-medium
                  file:bg-[#393939] file:text-[#ffffff]
                  hover:file:cursor-pointer hover:file:bg-[#ffffff]
                  hover:file:text-[#393939]"
                  onChange={(e) => setPartnerLogo(e.target.files[0])}
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="
                  mt-[3vh]
                  h-[5vh]
                  w-[10vw]
                  font-medium
                  bg-[#393939] text-[#ffffff]
                  hover:border-[#393939]
                  hover:border-[0.2vw]
                  rounded-[0.5vw]
                  hover:cursor-pointer hover:bg-[#ffffff]
                  hover:text-[#393939]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
