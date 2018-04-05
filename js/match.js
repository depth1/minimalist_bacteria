var situation = {
    board_index_reference: undefined,
    board: undefined,
    player: undefined,
    sq_origin: undefined,
    sq: undefined,
    moves: [],
    time_left: 0,
    loop_cpt: 0,
    match_loop: undefined,
    score: undefined,
    is_game_over: undefined
}

function match(with_previous_board)
{

    clear_situation();

    if(!with_previous_board || situation.board_index_reference == undefined)
    {
        situation.board_index_reference = get_random_int(CONFIG.BOARDS.length);
    }

    situation.board = board_string_to_array(CONFIG.BOARDS[situation.board_index_reference]);

    situation.player = (get_random_int(2) == 0) ? SQ_STATE.GREEN : SQ_STATE.RED;
    situation.time_left = CONFIG.MATCH_TIME;
    situation.score = get_score(situation.board);

    display_board(situation.board);
    display_score(situation.score);
    display_player(situation.player);
    display_time_left(situation.time_left);

    situation.match_loop = setInterval(on_match_loop, CONFIG.MATCH_LOOP_SPEED);
}

function on_match_loop()
{
    if (situation.loop_cpt >= (1000 / CONFIG.MATCH_LOOP_SPEED)) // assert CONFIG.MATCH_LOOP_SPEED < 1000
    {
        situation.loop_cpt = 0;
        situation.time_left--;

        display_time_left(situation.time_left);
    }
    if (situation.time_left <= 0)
    {
        situation.player = get_opponent(situation.player);
        situation.time_left = CONFIG.MATCH_TIME;

        display_board(situation.board);
        display_player(situation.player);
        display_time_left(situation.time_left);
    }
    situation.loop_cpt++;
}

function on_click_sq(sq)
{
    if(situation.is_game_over) return;

    display_board(situation.board);

    if (situation.sq_origin == sq)
    {
        situation.sq_origin = undefined;
    }
    else if (situation.board[sq] == situation.player)
    {
        situation.sq_origin = sq;
        situation.moves = generate_moves_for_sq(situation.board, sq);
        display_moves(situation.moves, situation.player);
    }
    else if (situation.sq_origin != undefined)
    {
        for (var i = 0; i < situation.moves.length; i++)
        {
            var move = situation.moves[i];
            if (move.sq_origin == sq && move.sq == sq)
            {
                make_move(situation.board, situation.player, sq, sq);
                var is_game_over = check_game_over(situation.board);
                situation.score = get_score(situation.board);
                display_score(situation.score);
                situation.time_left = 0;
                situation.sq_origin = undefined;
                if(is_game_over)
                {
                    game_over();
                }
                break;
            }
            else if (move.sq_origin == situation.sq_origin && move.sq == sq)
            {
                make_move(situation.board, situation.player, situation.sq_origin, sq);
                var is_game_over = check_game_over(situation.board);
                situation.score = get_score(situation.board);
                display_score(situation.score);
                situation.time_left = 0;
                situation.sq_origin = undefined;
                if(is_game_over)
                {
                    game_over();
                }
                break;
            }
        }
        situation.sq_origin = undefined;
    }
}

function game_over()
{
    situation.is_game_over = true;

    clearInterval(situation.match_loop);

    if(situation.score.RED > situation.score.GREEN)
    {
        display_player(SQ_STATE.GREEN);
        display_game_over();
    }
    else if(situation.score.RED < situation.score.GREEN)
    {
        display_player(SQ_STATE.RED);
        display_game_over();
    }
    else
    {
        display_game_draw();
    }
    display_board(situation.board);
}

function get_random_int(max) // [0, max[
{
    return Math.floor(Math.random() * Math.floor(max));
}

function clear_situation()
{
    situation.board = undefined;
    situation.player = undefined;
    situation.sq_origin= undefined;
    situation.sq = undefined;
    situation.moves = [];
    situation.time_left = 0;
    situation.loop_cpt = 0;
    clearInterval(situation.match_loop);
    situation.score = undefined;
    situation.is_game_over = undefined;
}