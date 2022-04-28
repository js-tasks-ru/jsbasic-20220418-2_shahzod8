function makeFriendsList(friends) {
  const friendsList = document.createElement('ul');
  friends.forEach(({ firstName, lastName }) => {
    const friendsListItem = document.createElement('li');
    friendsListItem.textContent = `${firstName} ${lastName}`;
    friendsList.appendChild(friendsListItem);
  });

  return friendsList;
}
