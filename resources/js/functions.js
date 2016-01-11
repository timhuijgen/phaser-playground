
function getArguments(arg, start, end)
{
    var args = new Array(arg.length);
    for(var i = start; i < args.length; ++i) {
        args[i] = arg[i];
    }
    if(end) {
        args = Array.prototype.slice.call(args, 0, end);
    }
    return args;
}