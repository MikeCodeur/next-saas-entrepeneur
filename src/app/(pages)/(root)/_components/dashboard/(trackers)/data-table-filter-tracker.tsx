import {DATA_TABLE_CATEGORIES} from "@/utils/constants"
import {DataTableFacetedFilter} from "@/app/components/ui/data-table-faceted-filter"
import type {Table} from "@tanstack/react-table"
import {Tracker} from "@/types/trackers-types"

type DataTableFilterTrackerProps<TData> = {
  table: Table<TData>
  isCategory: boolean
}

function DataTableFilterTracker<TData>({
  table,
  isCategory,
}: DataTableFilterTrackerProps<TData>) {
  // Dimitri: need to be more generic?
  const tableType: Tracker = table
    .getAllFlatColumns()
    .some((column) => column.id === "amount")
    ? "finance"
    : "health"
  return (
    <>
      {isCategory && (
        <DataTableFacetedFilter
          column={table.getColumn("category")}
          title="Catégorie"
          options={DATA_TABLE_CATEGORIES[tableType]}
        />
      )}
    </>
  )
}

export default DataTableFilterTracker
