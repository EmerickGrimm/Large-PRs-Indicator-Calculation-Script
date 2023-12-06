# Large PRs Indicator Calculation Script

## Overview

This script calculates the "Large PRs" indicator for three users based on data stored in three separate XLSX files: `commits_data.xlsx`, `commits_changes.xlsx`, and `PR_dataset.xlsx`. The indicator identifies PRs with total additions greater than 500.

## Script Usage

1. Install the required dependencies:

   ```bash
   npm install xlsx
# Script Explanation

1. Read XLSX Files:

    The script uses the xlsx library to read data from three separate XLSX files: commits_data.xlsx, commits_changes.xlsx, and PR_dataset.xlsx.

2. Data Merging:

    The script merges data from commits_data.xlsx and commits_changes.xlsx based on the common identifier sha. It then combines this merged data with PR_dataset.xlsx based on the common identifier pull_request_id. This results in a dataset (mergedData) containing information about each pull request along with the total additions.

3. Large PRs Calculation:

    The script calculates the number of Large PRs for each user by checking if the total additions for a pull request exceed 500. The results are stored in the largePRs object.

4. Result Printing:

    The script prints the final results, showing the number of Large PRs for each user.

## Calculation Table

| User ID | Pull Request ID | Total Additions | Large PRs |
| ------- | --------------- | --------------- | --------- |
| userA   | pr1             | 600             | 1         |
| userB   | pr2             | 600             | 1         |
| userC   | pr3             | 300             | 0         |

Explanation:
- For `userA`, `pr1` has total additions of 600, which is greater than 500. Therefore, it is considered a Large PR.
- For `userB`, `pr2` also has total additions of 600, making it a Large PR.
- For `userC`, `pr3` has total additions of 300, which is below 500, so it is not a Large PR.
