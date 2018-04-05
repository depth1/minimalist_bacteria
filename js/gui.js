function display_board(board)
{
    for (var i = 0; i < board.length; i++)
    {
        var gui_sq = eval('document.game.sq' + i); //name du form
        switch (board[i])
        {
        case SQ_STATE.EMPTY:
            gui_sq.className = "square square-empty";
            break;
        case SQ_STATE.FULL:
            gui_sq.className = "square square-full";
            break;
        case SQ_STATE.RED:
            gui_sq.className = "square square-red";;
            break;
        case SQ_STATE.GREEN:
            gui_sq.className = "square square-green";
            break;
        default:
        }
    }
}

function display_moves(moves, player)
{
    for (var i = 0; i < moves.length; i++)
    {
        var gui_sq = eval('document.game.sq' + moves[i].sq);
        if (moves[i].sq_origin == moves[i].sq)
        {
            if (player == SQ_STATE.RED)
            {
                gui_sq.className = "square square-red-duplication";
            }
            else
            {
                gui_sq.className = "square square-green-duplication";
            }
        }
        else
        {
            if (player == SQ_STATE.RED)
            {
                gui_sq.className = "square square-red-shifting";
            }
            else
            {
                gui_sq.className = "square square-green-shifting";
            }
        }
    }
}

function display_player(player)
{
    var gui_time = document.game.time;
    switch (player)
    {
        case SQ_STATE.RED:
            gui_time.className = "time time-red";
            break;
        case SQ_STATE.GREEN:
            gui_time.className = "time time-green";
            break;
        default:
    }
}

function display_time_left(time_left)
{
    var gui_time = document.game.time;
    gui_time.innerHTML = time_left;
}

function display_game_over()
{
    var gui_time = document.game.time;
    gui_time.innerHTML = "game over :[";
}

function display_game_draw()
{
    var gui_time = document.game.time;
    gui_time.innerHTML = "equality ^.^";
    gui_time.className = "time";
}

function display_score(score)
{
    var gui_score_red = document.game.score_red;
    var gui_score_green = document.game.score_green;

    gui_score_red.className = "score score-red";
    gui_score_red.innerHTML = score.RED;

    gui_score_green.className = "score score-green";
    gui_score_green.innerHTML = score.GREEN;
}
