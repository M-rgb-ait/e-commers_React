import { InfinitySpin } from "react-loader-spinner";



export default function LoderScreen() {
  return (
    <>
    <div className="relative">

    <div className="loderscreen absolute">
<InfinitySpin
  visible={true}
  width="200"
  color="#4fa94d"
  ariaLabel="infinity-spin-loading"
  />
    </div>
  </div>
      
    </>
  )
}

