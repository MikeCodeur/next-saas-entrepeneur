import {trackers} from "@/utils/constants"

export type Tracker = (typeof trackers)[number]
export type TrackerName = Tracker
