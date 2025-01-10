type authorizationWithoutResource = {
  canFunc(): Promise<boolean>
}
type authorizationWithResource = {
  canFunc(resourceUid: string): Promise<boolean>
  resourceUid: string
}
type authorizationFuncType =
  | authorizationWithoutResource
  | authorizationWithResource

export const assertAuthorization = async (props: authorizationFuncType) => {
  const granted =
    "resourceUid" in props
      ? await props.canFunc(props.resourceUid)
      : await props.canFunc()

  if (!granted) {
    throw new Error("Vous n'êtes pas autorisé à effectuer cette action")
  }
}
