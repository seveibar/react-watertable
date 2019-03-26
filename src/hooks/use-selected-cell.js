// @flow

import React, {
  useMemo,
  useEffect,
  useContext,
  useState,
  createContext
} from "react"
export const SelectedCellContext = createContext({
  selectedCellId: null,
  changeSelectedCellId: (cellId: string | null) => {}
})

export const SelectedCellProvider = ({ children }) => {
  const [selectedCellId, changeSelectedCellId] = useState(null)
  useEffect(() => {
    if (!window) return () => {}
    const listener = e => {
      if (e.key === "Escape") {
        changeSelectedCellId(null)
      }
    }

    window.addEventListener("keydown", listener)
    return () => {
      window.removeEventListener("keydown", listener)
    }
  }, [])
  return (
    <SelectedCellContext.Provider
      value={{ selectedCellId, changeSelectedCellId }}
    >
      <div>{children}</div>
    </SelectedCellContext.Provider>
  )
}

export const useUnselectCell = () => {
  const { changeSelectedCellId } = useContext(SelectedCellContext)
  return () => {
    changeSelectedCellId(null)
  }
}

export const useSelectedCell = () => {
  const myId = useMemo(
    () =>
      Math.random()
        .toString()
        .split(".")[1],
    []
  )
  const { selectedCellId, changeSelectedCellId } = useContext(
    SelectedCellContext
  )
  return useMemo(
    () => [
      selectedCellId === myId,
      () => {
        changeSelectedCellId(myId)
      }
    ],
    [selectedCellId === myId]
  )
}

export default useSelectedCell
