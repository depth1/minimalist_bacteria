function board_string_to_array(board_string)
{
    var board_array = [];
    for (var i = 0; i < board_string.length; i++)
    {
        board_array.push(parseInt(board_string.charAt(i)));
    }
    return board_array;
}

function fill_empty_sq_with(board, player)
{
    for (var i = 0; i < board.length; i++)
    {
        if (board[i] == SQ_STATE.EMPTY)
        {
            board[i] = player;
        }
    }
}

function get_score(board)
{
    var score = {
        GREEN: 0,
        RED: 0
    };
    for (var i = 0; i < board.length; i++)
    {
        switch (board[i]) {
        case SQ_STATE.RED:
            score.RED++;
            break;
        case SQ_STATE.GREEN:
            score.GREEN++;
            break;
        default:
        }
    }
    return score;
}

function get_opponent(player)
{
    return (player == SQ_STATE.RED) ? SQ_STATE.GREEN : SQ_STATE.RED;
}

// si deplacement sq_origin = sq
function make_move(board, player, sq_origin, sq)
{
    board[sq_origin] = SQ_STATE.EMPTY;
    board[sq] = player;
    propagate(board, player, sq);
}

function propagate(board, player, sq)
{
    for (var i = 0; i < RULES.length; i++)
    {
        if (Math.abs(RULES[i][0]) < 2 && Math.abs(RULES[i][1]) < 2)// duplication
        {
            var sq_target = sq + RULES[i][0] + RULES[i][1] * 8;
            var sq_is_not_allowed = (RULES[i][0] < 0 && sq % 8 == 0) || (RULES[i][0] > 0 && (sq + 1) % 8 == 0);

            if (board[sq_target] == get_opponent(player) && !sq_is_not_allowed)
            {
                board[sq_target] = player;
            }
        }
    }
}

function generate_moves(board)
{
    var moves = {
        GREEN: [], // sq_origin, sq
        RED: []
    }

    for (var i = 0; i < board.length; i++)
    {
        var sq = i;
        var sq_state = board[i];
        switch (sq_state) {
        case SQ_STATE.RED:
            var moves_for_sq = generate_moves_for_sq(board, sq);
            for (var j = 0; j < moves_for_sq.length; j++)
            {
                moves.RED.push(moves_for_sq[j]);
            }
            break;
        case SQ_STATE.GREEN:
            var moves_for_sq = generate_moves_for_sq(board, sq);
            for (var j = 0; j < moves_for_sq.length; j++)
            {
                moves.GREEN.push(moves_for_sq[j]);
            }
            break;
        default:
        }
    }

    return moves;
}

function generate_moves_for_sq(board, sq)
{
    var moves_for_sq = [];
    for (var i = 0; i < RULES.length; i++)
    {
        var sq_target = sq + RULES[i][0] + RULES[i][1] * 8;
        var sq_is_not_allowed = (RULES[i][0] < 0 && sq % 8 == 0) || (RULES[i][0] > 0 && (sq + 1) % 8 == 0) || (RULES[i][0] == 2 && RULES[i][1] == 0 && (sq + 2) % 8 == 0) || (RULES[i][0] == -2 && RULES[i][1] == 0 && (sq - 1) % 8 == 0);
        if (board[sq_target] == SQ_STATE.EMPTY && !sq_is_not_allowed)
        {
            if (Math.abs(RULES[i][0]) > 1 || Math.abs(RULES[i][1]) > 1)
            {
                moves_for_sq.push({ sq_origin: sq, sq: sq_target });
            }
            else
            {
                moves_for_sq.push({ sq_origin: sq_target, sq: sq_target }); // duplication : set sq_origin to sq for better manipulation
            }
        }
    }

    return moves_for_sq;
}

function is_move_valid(board, move)
{
    //TODO :)
}

function check_game_over(board)
{
    var moves = generate_moves(board);
    if(moves.GREEN.length == 0)
    {
        fill_empty_sq_with(board, SQ_STATE.RED);
        return true;
    }
    else if(moves.RED.length == 0)
    {
        fill_empty_sq_with(board, SQ_STATE.GREEN);
        return true;
    }

    return false;
}