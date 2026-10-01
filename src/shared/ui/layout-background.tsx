import classes from "./layout-background.module.css";

export function LayoutBackground() {
  return (
    <div className={classes.background}>
      <div className={classes.layerBase} />
      <div className={classes.layerAdditional} />
      <div className={classes.layerPattern} />
    </div>
  );
}
