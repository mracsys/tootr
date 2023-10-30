import { GraphPlugin, WorldGraphFactory } from "@mracsys/randomizer-graph-tool";
import { createContext } from "react";

const defaultGraph = WorldGraphFactory('ootr', {}, '7.1.143', {files: {}});

export const GraphContext = createContext<GraphPlugin>(defaultGraph);