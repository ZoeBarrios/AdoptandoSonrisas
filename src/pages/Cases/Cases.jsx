import CaseContainer from "../../components/caseContainer/CaseContainer";
import DefaultPage from "../defaultPage/DefaultPage";
export default function Cases() {
  return (
    <DefaultPage>
      <div className="w-full h-screen mb-5  flex flex-row items-center justify-around ">
        <CaseContainer />
      </div>
    </DefaultPage>
  );
}
