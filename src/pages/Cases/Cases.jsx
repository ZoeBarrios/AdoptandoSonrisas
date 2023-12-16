import CaseContainer from "../../components/caseContainer/CaseContainer";
import DefaultPage from "../defaultPage/DefaultPage";
export default function Cases() {
  return (
    <DefaultPage>
      <div className="w-full h-full mb-5 md:h-screen flex flex-row items-center justify-around mt-32">
        <CaseContainer />
      </div>
    </DefaultPage>
  );
}
