echo "<<< husky setup"

husky install

echo "### successfully husky setup"

while ! [ -f "$ENVFILE" ]; do
    read -p "Invalid ENV File directory, Please make sure your env project"
done

set -a
. $ENVFILE
set +a


echo "Runing the project..."
next build