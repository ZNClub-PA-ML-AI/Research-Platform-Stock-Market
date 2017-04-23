
#display entered user id
echo "entered this user_id:"$1

#set params for git config
if [ $1=="ZNevzz" ]
then username='"ZNevzz"';email="dsouza.nevil45@gmail.com"

elif [ $1=="melwyn95" ]
then username="melwyn95";email="melwyn95@gmail.com"

elif [ $1=="Crystal21" ]
then username="Crystal21";email="cuthinho.crystal95@gmail.com"

fi



echo $username
echo $email

#fire git commands
git config --global user.name $username
git config --global user.email $email

#end

