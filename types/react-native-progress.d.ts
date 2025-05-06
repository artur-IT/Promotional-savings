declare module "react-native-progress/Bar" {
  import { Component } from "react";

  interface ProgressBarProps {
    progress: number;
    width?: number;
    height?: number;
    color?: string;
    unfilledColor?: string;
    borderWidth?: number;
    borderColor?: string;
    borderRadius?: number;
    animated?: boolean;
  }

  export default class ProgressBar extends Component<ProgressBarProps> {}
}
