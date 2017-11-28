export default function getImage(pet: Object): {uri: ?string} {
  let uri = pet && pet.avatar_url ? 'https:' + pet.avatar_url : null;
  return uri ? { uri } : null;
}