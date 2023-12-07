#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

typedef struct {
    int *winning;
    int *you;
    size_t winning_len;
    size_t you_len;
} Card;

void add_card(Card **cards, size_t *len) {
    *cards = realloc(*cards, *len * sizeof(Card) + 1);
    *cards[*len] = (Card) {
        .winning = malloc(0),
        .you = malloc(0),
        .winning_len = 0,
        .you_len = 0
    };
    (*len)++;
}

void print_card(Card card) {
    printf("(");
    for (int i = 0; i < card.winning_len; i++) {
        printf("%d", card.winning[i]);
        if (i != card.winning_len - 1)
            printf(" ");
    }
    printf(" | ");
    for (int i = 0; i < card.you_len; i++) {
        printf("%d", card.you[i]);
        if (i != card.you_len - 1)
            printf(" ");
    }
    printf(")\n");
}

void print_cards(Card *cards, size_t len) {
    for (int i = 0; i < len; i++) {
        print_card(cards[i]);
    }
}

int main() {
    FILE *fp = fopen("test.txt", "r");

    Card *cards = malloc(0); // dynamic list of cards
    size_t len = 0; // number of cards
    
    add_card(&cards, &len);

    cards[0].winning = realloc(cards[0].winning, (++(cards[0].winning_len)) * sizeof(int));
    //cards[0].winning[0] = 9;

    printf("%zu\n", cards[0].winning_len);

    print_cards(cards, len);

    
    /* char c; // current char
    bool should_add = false; // if we should add numbers to the cards list
    bool parsing_winning = true; // if we're reading the winning card or your card
    char *num = malloc(0); // current number being parsed
    while ((c = fgetc(fp)) != EOF) { // until the end of the file
        if (c == ':') {
            should_add = true;
        } else if (c == '\n') {
            should_add = false;
            parsing_winning = true;
            add_card(&cards, &len);
        } else if (should_add) {
            //printf("%c", c);
            if (c == '|') {
                parsing_winning = false;
            } else if (c >= '0' && c <= '9') {
                //printf("adding %c to '%s'\n", c, num);
                // add digit to num
                num = realloc(num, strlen(num) + 1);
                num[strlen(num)] = c;
                //printf("num is now '%s'\n", num);
            } else if (c == ' ' && strlen(num)) {
                printf("there are %zu cards\n", len);
                Card last = cards[len - 1];
                print_cards(cards, len);
                // add num to cards 
                if (parsing_winning) {
                    last.winning = realloc(last.winning, (++last.winning_len) * sizeof(int));
                    last.winning[last.winning_len - 1] = atoi(num);
                } else {
                    last.you = realloc(last.you, (++last.you_len) * sizeof(int));
                    last.you[last.you_len - 1] = atoi(num);
                }
                free(num);
                num = malloc(0);
            }
        }
    
    } */

    fclose(fp);

    return 0;
}