/*
 * Why did I do this in C++? That's a great question. Also this was written on 
 * my first (and hopefully last) day of my C++ experience so if you're about to
 * read this code, I apologize in advance.
 */

#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <tuple>

using namespace std;

vector<string> split(string str, string delim) {
    vector<string> tokens;
    int start = 0; // start of first token
    int end = str.find(delim); // end of second token

    // while there are still tokens to be found
    while (end != -1) {
        string token = str.substr(start, end - start); // get the token
        if (token != "") tokens.push_back(token); // add the token we've found
        // update start and end for next token
        start = end + delim.length();
        end = str.find(delim, start);
    }

    tokens.push_back(str.substr(start, end - start));
    return tokens;
}

void trim_strs(vector<string> vec) {
    for (int i = 0; i < vec.size(); i++) {
        vec[i] = vec[i].substr(0, vec[i].find(" "));
    }
}

vector<string> intersect(vector<string> a, vector<string> b) {
    vector<string> common;

    for (int i = 0; i < b.size(); i++) {
        if (find(a.begin(), a.end(), b[i]) != a.end())
            common.push_back(b[i]);
    }

    return common;
}

int part1(vector<tuple<vector<string>, vector<string> > > data) {
    int total = 0;

    for (int i = 0; i < data.size(); i++) {
        vector<string> common = intersect(get<0>(data[i]), get<1>(data[i]));
        if (common.size() > 0) total += pow(2, common.size() - 1);
    }

    return total;
}

int part2(vector<tuple<vector<string>, vector<string> > > data) {
    vector<int> copies(data.size(), 1);

    for (int i = 0; i < data.size(); i++) {
        vector<string> common = intersect(get<0>(data[i]), get<1>(data[i]));
        for (int j = 0; j < copies[i]; j++) {
            for (int k = i + 1; k < i + common.size() + 1; k++) {
                copies[k]++;
            }
        }
    }

    int total = 0;
    for (int i = 0; i < copies.size(); i++) total += copies[i];

    return total;
}

int main() {
    ifstream file("in.txt");
    string line;
    vector<tuple<vector<string>, vector<string> > > data;

    while (getline(file, line)) {
        string nums = line.substr(line.find(":") + 2); // get rid of the "Card n: " bit
        string winning = nums.substr(0, nums.find("|")); // string of space separated winning numbers
        string you = nums.substr(nums.find("|") + 2); // your numbers

        // `winning` and `you` variables as vectors
        vector<string> winning_nums = split(winning, " ");
        vector<string> you_nums = split(you, " ");

        trim_strs(winning_nums);
        trim_strs(you_nums);

        data.push_back(make_tuple(winning_nums, you_nums));
    }

    cout << part1(data) << endl;
    cout << part2(data) << endl;

    return 0;
}