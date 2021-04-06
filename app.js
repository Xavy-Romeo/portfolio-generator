const profileDataArgs = process.argv.slice(2);

const printProfileData = profileDataArr => {
  for (let i = 0; i < profileDataArr.length; i += 1) {
    console.log(profileDataArr[i]);
  }
  // This loop is 
  console.log('================');

  // the same this forEach loop
  profileDataArr.forEach(profileItem => console.log(profileItem));
};

printProfileData(profileDataArgs);
