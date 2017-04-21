
#display entered user id
echo "entered this user_id:"$1

#set params for git config
if [ $1=="znevzz" ]
then username='"ZNevzz"';email="dsouza.nevil45@gmail.com"
else  username="melwyn95";email="melwyn95@gmail.com"
fi

echo $username
echo $email

#fire git commands
git config --global user.name $username
git config --global user.email $email

#end
 
