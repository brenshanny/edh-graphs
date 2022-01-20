set -e

if [ -f ./new_stats.csv ]; then
  echo "Removing old stats file"
  rm ./new_stats.csv
fi

echo "Starting up python env"
source ../edh-graphs-env/bin/activate

echo "Running script..."
python3 pull_data.py

NUMBER=$(sed -n '/dumb-test-for-rebuilding/p' ../src/App.js | sed 's/[^0-9]*//g')

echo "Number found: $NUMBER"

echo "Moving File..."
mv ./new_stats.csv ../src/stats.csv

NEW_NUMBER=$(($NUMBER + 1))

NEW_STR="dumb-test-for-rebuilding-$NEW_NUMBER"

echo "New Number: $NEW_NUMBER"
echo "New Str: $NEW_STR"

sed -i -n "s/dumb-test-for-rebuilding-$NUMBER/$NEW_STR/g" ../src/App.js

if command -v yarn --version &> /dev/null; then
  yarn run deploy
fi

set +e
