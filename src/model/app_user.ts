export interface AppUser {
  id?: number,
  username: string,
  password: string,
  first_name?: string,
  last_name?: string,
  roles?: string[],
  activated?: boolean,
  profile_image_id?: number
}
