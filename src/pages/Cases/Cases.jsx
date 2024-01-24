import CaseContainer from "../../components/containers/caseContainer/CaseContainer";
import DefaultPage from "../defaultPage/DefaultPage";
export default function Cases() {
  return (
    <DefaultPage>
      <div className="w-full min-h-screen mb-5  flex flex-row items-center justify-around  ">
        <CaseContainer />
      </div>
    </DefaultPage>
  );
}
