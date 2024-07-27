import { useGlboalContext } from "../../context";

const Dimm = () => {
    const { dimm } = useGlboalContext();
    return (
        <div
            id="dimm"
            className={`${dimm.showDimm ? "show-noclick" : "close"}`}
        ></div>
    );
};
export default Dimm;
