import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import EarthquakesForm from "main/components/Earthquakes/EarthquakesForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function EarthquakesCreatePage() {

  /*
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Earthquakes Retrieve Page</h1>
        <p>
          This is where the retrieve page will go
        </p>
      </div>
    </BasicLayout>
  )
  */

  
  const objectToAxiosParams = (earthquakes) => ({
    url: "/api/earthquakes/retrieve",
    method: "POST",
    params: {
      distance: earthquakes.distance,
      minMag: earthquakes.minMag,
    }
  });

  const onSuccess = (earthquakes) => {
    //console.log("The earthquakes length is:", earthquakes.length);
    toast(`${earthquakes.length} Earthquakes retrieved`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
     { onSuccess }, 
     // Stryker disable next-line all : hard to set up test for caching
     ["/api/earthquakes/all"]
     );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess) {
    return <Navigate to="/earthquakes/list" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Retrieve Earthquakes</h1>

        <EarthquakesForm submitAction={onSubmit} />

      </div>
    </BasicLayout>
  )
  
}