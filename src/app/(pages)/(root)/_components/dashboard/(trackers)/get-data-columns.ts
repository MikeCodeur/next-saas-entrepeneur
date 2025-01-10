"use client"

import {financeColumns, financeColumnsGranted} from "./finance/finance-columns"
import {healthColumns, healthColumnsGranted} from "./health/health-columns"

import {TrackerName} from "@/types/trackers-types"

const getDataColumn = (
  isGranted: boolean,
  trackerName: TrackerName,
  uid: string
) => {
  switch (trackerName) {
    case "finance": {
      return isGranted ? financeColumnsGranted(uid) : financeColumns
    }
    case "health": {
      return isGranted ? healthColumnsGranted(uid) : healthColumns
    }
  }
}

export default getDataColumn
